import React, { useLayoutEffect, useState } from 'react';
import './App.css';

const result = {
  "status": "success",
  "message": "Remaining pipeline completed",
  "execution_time": "12.12 seconds",
  "steps_completed": [
    "Table extraction complete",
    "Image to text conversion complete",
    "Structured remaining processing complete"
  ],
  "timings": {
    "table_extraction": "6.03 seconds",
    "image_to_txt": "1.20 seconds",
    "structured_remaining": "4.88 seconds"
  },
  "results": [
    {
      "name_of_candidate": null,
      "father_name": null,
      "school_or_college_name": "NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY",
      "date_of_birth": null,
      "type_of_document": "Transcript",
      "issuing_authority": "Controller of Examinations, NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY",
      "is_educational_document": true,
      "month_year_of_exam": null,
      "cgpa": null,
      "overall_grade_of_candidate": null,
      "roll_no": null,
      "result": "Passed"
    }
  ]
}

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State to store the file name

  function syntaxHighlight(json) {
    return json.replace(/(&|<|>|"|')/g, (match) => {
      const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return escapeMap[match];
    }).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g, (match) => {
      let style = 'color: #000'; // Default color
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          style = 'color: #d73a49; font-weight: bold'; // Keys in red with bold font
        } else {
          style = 'color: #032f62'; // Strings in blue
        }
      } else if (/true|false/.test(match)) {
        style = 'color: #005cc5'; // Booleans in dark blue
      } else if (/null/.test(match)) {
        style = 'color: #6a737d'; // Null in gray
      } else if (/-?\d+(\.\d+)?([eE][+-]?\d+)?/.test(match)) {
        style = 'color: #22863a'; // Numbers in green
      }
      return `<span style="${style}">${match}</span>`;
    });
  }

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type.includes('image') || uploadedFile.type.includes('pdf'))) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name); // Set the file name
      setTimeout(() => {
        window.scrollTo({ top: 1050, behavior: 'smooth' });
      }, 500);
    } else {
      setFile(null);
      setFileName(''); // Clear the file name if invalid file is selected
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile && (uploadedFile.type.includes('image') || uploadedFile.type.includes('pdf'))) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name); // Set the file name
      setTimeout(() => {
        window.scrollTo({ top: 1050, behavior: 'smooth' });
      }, 500);
    } else {
      setFile(null);
      setFileName(''); // Clear the file name if invalid file is selected
    }
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])


  return (
    <div className="App min-h-screen bg-gray-50 p-8">
      <h1 className="text-5xl text-center font-bold -m-3 montserrat-underline py-1 px-5 rounded-2xl shadow-lg shadow-gray-400 text-gray-800 bg-red-400 w-fit mx-auto">OCR Comparison Tool</h1>

      {/* Single Drag-and-Drop Area */}
      <div
        className="border-dashed border-2 border-blue-400 mt-10 bg-blue-50 flex flex-col justify-center items-center p-8 rounded-lg shadow-lg shadow-gray-200 hover:bg-blue-100 transition duration-300"
        onDragOver={handleDragOver}
        onDrop={handleDrop} // Attach the onDrop handler
      >
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center text-blue-600 font-bold text-lg hover:text-blue-800 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2 text-blue-400 hover:text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
          Click to Upload or Drag & Drop
          <span className="text-sm text-gray-500 mt-1">(Only images or PDFs)</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(event) => {
            handleFileChange(event);
            event.target.value = null; // Reset the input field to remove default filename behavior
          }}
        />
        {fileName && (
          <p className="mt-4 text-gray-600 text-sm">
            Selected File: <span className="font-bold">{fileName}</span>
          </p>
        )}
      </div>

      {file &&
        <div className='flex mt-4 justify-center'>
          {file && file.type.includes('image') && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-1/2 h-[700px]"
            />
          )}
          {file && file.type.includes('pdf') && (
            <embed
              src={URL.createObjectURL(file)}
              type="application/pdf"
              className="w-1/2 h-[700px]"
            />
          )}
        </div>
      }

      <div className="flex flex-wrap justify-between mt-8 min-h-[600px]">
        {/* TIPSTAT */}
        <div className="w-[700px] min-h-[80%] bg-[#e6eeff] justify-center pt-4 px-4 shadow-lg rounded-lg">
          <h2 className="text-2xl underline font-bold text-[#2665eb] text-center">Tipstat's OCR Solution</h2>

          <div className='flex justify-center gap-x-4 mt-4'>
            <button
              // onClick={onClick}
              className="px-4 py-2 text-base font-medium text-white bg-[#8898ff] border-2 border-[#596fff] rounded-lg hover:bg-[#596fff] active:bg-[#3651ff] transition-transform transform hover:-translate-y-[2px] active:translate-y-0"
            > Process Table
            </button>

            <button
              // onClick={onClick}
              className="px-4 py-2 text-base font-medium text-white bg-[#8898ff] border-2 border-[#596fff] rounded-lg hover:bg-[#596fff] active:bg-[#3651ff] transition-transform transform hover:-translate-y-[2px] active:translate-y-0"
            > Process Remaining
            </button>
          </div>

          <h3 className="text-lg underline mt-4 text-red-400 text-center">Subtopic Solution</h3>
          <pre className="bg-gray-50 border p-4 mt-1 rounded-lg shadow-inner shadow-gray-400 overflow-auto h-[300px]">
            <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(result, null, 2)) }} />
          </pre>

          <h3 className="text-lg underline mt-4 text-red-400 text-center">Subtopic Solution</h3>
          <pre className="bg-gray-50 border p-4 mt-1 rounded-lg shadow-inner shadow-gray-400 overflow-auto h-[300px]">
            <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(result, null, 2)) }} />
          </pre>
        </div>

        {/* GLIB */}
        <div className="w-[700px] min-h-[80%] bg-[#ece3ff] justify-center pt-4 px-4 border shadow-lg rounded-lg">
          <h2 className="text-2xl border underline font-bold text-[#8b5cf6] text-center">GLib's OCR Solution</h2>
          <div className='flex justify-center gap-x-4 mt-4'>
            <button
              // onClick={onClick}
              className="px-4 py-2 text-base font-medium text-white bg-[#ab88ff] border-2 border-[#8b5cf6] rounded-lg hover:bg-[#8b5cf6] active:bg-[#783eff] transition-transform transform hover:-translate-y-[2px] active:translate-y-0"
            > Process File
            </button>

          </div>
          <pre className="bg-gray-50 mt-12 border p-4 mb-4 rounded-lg shadow-inner shadow-gray-400 overflow-auto h-[650px]">
            <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(result, null, 2)) }} />
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
