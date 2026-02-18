import React from "react";

const Footer = () => {
       return (
              <footer className="w-full mt-16 border-t border-gray-200 bg-white shadow-md rounded">

                     <div className="max-w-6xl mx-auto px-5 py-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                            {/* Brand */}
                            <div>
                                   <h2 className="text-lg font-semibold text-gray-800">ExamNotes AI</h2>
                                   <p className="text-sm text-gray-500 mt-2">
                                          Smart AI-powered study assistant to help you prepare faster,
                                          revise better, and score higher.
                                   </p>
                            </div>

                            {/* Product */}
                            <div>
                                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Product</h3>
                                   <ul className="space-y-2 text-sm text-gray-500">
                                          <li><a href="#" className="hover:text-green-600 transition">Features</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Pricing</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Updates</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Roadmap</a></li>
                                   </ul>
                            </div>

                            {/* Company */}
                            <div>
                                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Company</h3>
                                   <ul className="space-y-2 text-sm text-gray-500">
                                          <li><a href="#" className="hover:text-green-600 transition">About</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Contact</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Careers</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Blog</a></li>
                                   </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                   <h3 className="text-sm font-semibold text-gray-700 mb-3">Legal</h3>
                                   <ul className="space-y-2 text-sm text-gray-500">
                                          <li><a href="#" className="hover:text-green-600 transition">Privacy Policy</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Terms & Conditions</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Refund Policy</a></li>
                                          <li><a href="#" className="hover:text-green-600 transition">Support</a></li>
                                   </ul>
                            </div>

                     </div>

                     {/* Bottom Bar */}
                     <div className="border-t border-gray-100">
                            <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">

                                   <p>
                                          © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
                                   </p>

                                   {/* Social Icons */}
                                   <div className="flex gap-4 mt-2 sm:mt-0 text-sm">
                                          <a href="#" className="hover:text-green-600 transition">🌐</a>
                                          <a href="#" className="hover:text-green-600 transition">🐦</a>
                                          <a href="#" className="hover:text-green-600 transition">📸</a>
                                          <a href="#" className="hover:text-green-600 transition">💼</a>
                                   </div>

                            </div>
                     </div>

              </footer>
       );
};

export default Footer;

