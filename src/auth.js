import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDb from "./dataBase/connectDb";
import User from "./model/user";
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
       providers: [
              Credentials({
                     name: "Credentials",

                     credentials: {
                            email: { label: "Email", type: "email" },
                            password: { label: "Password", type: "password" },
                     },

                     async authorize(credentials) {
                            try {
                                   await connectDb();

                                   const email = credentials?.email;
                                   const password = credentials?.password;

                                   if (!email || !password) {
                                          throw new Error("Email and password are required");
                                   }

                                   const user = await User.findOne({ email });

                                   if (!user) {
                                          throw new Error("User does not exist");
                                   }

                                   const isMatchPassword = await bcrypt.compare(
                                          password,
                                          user.password
                                   );

                                   if (!isMatchPassword) {
                                          throw new Error("Incorrect password");
                                   }

                                   if (!user.isVerified) {
                                          user.isVerified = true;
                                          await user.save();
                                   }

                                   return {
                                          id: user._id.toString(),
                                          name: user.name,
                                          email: user.email,
                                          credits: user.credits,
                                   };

                            } catch (error) {
                                   throw new Error(error.message || "Login failed");
                            }
                     },

              }),

              Google({
                     clientId: process.env.GOOGLE_CLIENT_ID,
                     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              })
       ],

       callbacks: {
              async signIn({ user, account, profile }) {
                     if (account?.provider === "google") {
                            try {
                                   await connectDb();

                                   const existingUser = await User.findOne({ email: user.email });

                                   if (!existingUser) {
                                          await User.create({
                                                 name: user.name,
                                                 email: user.email,
                                                 profilePic: profile?.picture,
                                                 isVerified: true,
                                                 credits: 50,
                                                 provider: "google",
                                          });
                                   }
                                   return true;
                            } catch (error) {
                                   console.error("Google SignIn Error:", error);
                                   return false;
                            }
                     }

                     return true;
              },


              async jwt({ token, user }) {
                     if (user) {
                            token.id = user.id;
                            token.name = user.name;
                            token.email = user.email;
                            token.credits = user.credits;
                     }
                     return token;
              },

              async session({ session, token }) {
                     if (token) {
                            session.user.id = token.id;
                            session.user.name = token.name;
                            session.user.email = token.email;
                            session.user.credits = token.credits;
                     }
                     return session;
              },
       },

       pages: {
              signIn: "/login",
       },

       session: {
              strategy: "jwt",
              maxAge: 10 * 24 * 60 * 60, // 10 days in seconds , 10 DIN MEA EXPIRE
       },

       //NextAuth ka security password jo session/JWT ko safe rakhta hai.
       secret: process.env.AUTH_SECRET,
});

