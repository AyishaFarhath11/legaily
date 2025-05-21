import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./App.css";
import { processFile, translateFile } from "./api";
import { pdfjs } from 'react-pdf';

// Update the worker source to the local file in the public folder
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

const DocAIPage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [action, setAction] = useState("translate");
  const [targetLanguage, setTargetLanguage] = useState("urdu");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file upload and preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileUrl(URL.createObjectURL(uploadedFile));
    setNumPages(null);
    setPageNumber(1);
    setResult("");
  };

  // PDF loaded
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");
    setLoading(true);
    try {
      let data;
      if (action === "translate") {
        if (!targetLanguage) return alert("Select a target language");
        data = await translateFile(file, targetLanguage);
      } else {
        data = await processFile(file, action);
      }
      setResult(data.result || "No result returned.");
    } catch (error) {
      setResult("An error occurred while processing.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="docai-main">
      <div className="docai-actions">
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload" className="docai-upload-btn">
          {file ? "Change File" : "Upload File"}
        </label>
        <span className="docai-selected-file">
         {file ? `Selected file: ${file.name}` : "No file selected"}
        </span>
        <div className="docai-btn-group">
          <button
            className={action === "translate" ? "active" : ""}
            onClick={() => setAction("translate")}
          >
            Translate
          </button>
          <button
            className={action === "summarize" ? "active" : ""}
            onClick={() => setAction("summarize")}
          >
            Summarize
          </button>
          <button
            className={action === "simplify" ? "active" : ""}
            onClick={() => setAction("simplify")}
          >
            Simplify Language
          </button>
        </div>
        {action === "translate" && (
          <select
            className="docai-language-select"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="">-- Select Language --</option>
            <option value="hindi">Hindi</option>
            <option value="kannada">Kannada</option>
            <option value="english">English</option>
            <option value="tamil">Tamil</option>
            <option value="telugu">Telugu</option>
            <option value="marathi">Marathi</option>
            <option value="malayalam">Malayalam</option>
            <option value="bengali">Bengali</option>
            <option value="gujarati">Gujarati</option>
            <option value="punjabi">Punjabi</option>
            <option value="assamese">Assamese</option>
            <option value="urdu">Urdu</option>
            <option value="odia">Odia</option>
          </select>
        )}
        <button
          className="docai-get-answer"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Get Answer"}
        </button>
      </div>
      <div className="docai-content">
        <div className="docai-file-viewer">
          {fileUrl ? (
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading="Loading PDF..."
            >
              <Page pageNumber={pageNumber} />
              <div className="docai-pdf-pagination">
                <button
                  onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                  disabled={pageNumber <= 1}
                >
                  {"<"}
                </button>
                <span>
                  {pageNumber} of {numPages}
                </span>
                <button
                  onClick={() =>
                    setPageNumber((p) => Math.min(p + 1, numPages))
                  }
                  disabled={pageNumber >= numPages}
                >
                  {">"}
                </button>
              </div>
            </Document>
          ) : (
            <div className="docai-file-placeholder">
              <span>No file uploaded</span>
            </div>
          )}
        </div>
        <div className="docai-output-window">
          <div className="docai-output-title">Output</div>
          <div className="docai-output-content">
            {result ? <pre>{result}</pre> : <span>No output yet.</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocAIPage;
