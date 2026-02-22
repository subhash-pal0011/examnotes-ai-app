import puppeteer from "puppeteer";

function extractSection(text, start, end) {
       const regex = new RegExp(`${start}([\\s\\S]*?)${end}`, "i");
       return text.match(regex)?.[1]?.trim() || "";
}

function extractQuestions(sectionText) {
       return sectionText
              .split(/\n\d+\.|\n-\s|\n•\s/) // split by list patterns
              .map(q => q.trim())
              .filter(q => q.length > 5);
}

export async function POST(req) {
       try {
              const { result } = await req.json();

              if (!result) {
                     return Response.json(
                            { success: false, message: "No PDF data received" },
                            { status: 400 }
                     );
              }

              const rawText = typeof result === "string" ? result : result.notes;


              const shortSection = extractSection(
                     rawText,
                     "Short Answer Questions",
                     "Important Questions"
              );

              const importantSection = extractSection(
                     rawText,
                     "Important Questions",
                     "Long Answer Questions"
              );

              const longSection = extractSection(
                     rawText,
                     "Long Answer Questions",
                     "Very Important Questions"
              );

              const vipSection = extractSection(
                     rawText,
                     "Very Important Questions",
                     "Likely Exam Focus"
              );

              const diagramSection = extractSection(
                     rawText,
                     "Diagram Section",
                     "Table Section"
              );

              const chartSection = extractSection(
                     rawText,
                     "Table Section",
                     "Exam Tips"
              );

              const notesClean = rawText.split("## Exam Questions Section")[0];


              const questions = {
                     short: extractQuestions(shortSection),
                     important: extractQuestions(importantSection),
                     long: extractQuestions(longSection),
                     veryImportant: extractQuestions(vipSection),
              };

              const browser = await puppeteer.launch({
                     headless: "new",
                     args: ["--no-sandbox"],
              });

              const page = await browser.newPage();

              const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 40px; }
          h1 { text-align:center; }
          h2 { margin-top:25px; }
          li { margin-bottom:6px; }
          .diagram {
            background:#f4f4f4;
            padding:10px;
            white-space:pre-wrap;
            font-family:monospace;
          }
          table { border-collapse: collapse; width:100%; }
          table, th, td { border:1px solid #999; }
          th, td { padding:8px; }
        </style>
      </head>
      <body>

        <h1>📘 Exam Notes AI</h1>

        <h2>🧠 Notes</h2>
        <p>${notesClean}</p>

        <h2>✏ Short Questions</h2>
        <ul>
          ${questions.short.length
                            ? questions.short.map(q => `<li>${q}</li>`).join("")
                            : "<li>No short questions available</li>"
                     }
        </ul>

        <h2>🔥 Important Questions</h2>
        <ul>
          ${questions.important.length
                            ? questions.important.map(q => `<li>${q}</li>`).join("")
                            : "<li>No important questions available</li>"
                     }
        </ul>

        <h2>📝 Long Questions</h2>
        <ul>
          ${questions.long.length
                            ? questions.long.map(q => `<li>${q}</li>`).join("")
                            : "<li>No long questions available</li>"
                     }
        </ul>

        <h2>⭐ Very Important Questions</h2>
        <ul>
          ${questions.veryImportant.length
                            ? questions.veryImportant.map(q => `<li>${q}</li>`).join("")
                            : "<li>No VIP questions available</li>"
                     }
        </ul>

        ${diagramSection
                            ? `<h2>📈 Diagram</h2><div class="diagram">${diagramSection}</div>`
                            : ""
                     }

        ${chartSection
                            ? `<h2>📊 Table</h2><div>${chartSection}</div>`
                            : ""
                     }

      </body>
    </html>
    `;

              await page.setContent(html, { waitUntil: "domcontentloaded" });

              const pdfBuffer = await page.pdf({
                     format: "A4",
                     printBackground: true,
              });

              await browser.close();

              return new Response(pdfBuffer, {
                     headers: {
                            "Content-Type": "application/pdf",
                            "Content-Disposition": 'attachment; filename="ExamNotesAI.pdf"',
                     },
              });

       } catch (err) {
              console.error("PDF Error:", err);

              return Response.json(
                     { success: false, message: err.message },
                     { status: 500 }
              );
       }
}
