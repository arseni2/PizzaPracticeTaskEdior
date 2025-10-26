"use client"

const response = `
  <style>
    p {
      color: blue;
    }
  </style>
  <script>
    console.log(document.cookie)
    const p = document.querySelector(".projectParagraph")
    console.log(document)
    // p.style.color = "red"
    </script>
  <p>text from response</p>
`;
export default function Home() {
    return (
        <div>
            <div className="project">
                <p className="projectParagraph">paragraph</p>
            </div>
            <div className="code">
                {/* Хост-элемент для Shadow DOM */}
                <iframe sandbox={"allow-same-origin"} srcDoc={response} />
            </div>
        </div>
    );
}
