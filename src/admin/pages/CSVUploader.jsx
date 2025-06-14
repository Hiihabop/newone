// CSVUploader.jsx
import { useState } from "react";
import Papa from "papaparse";
import { db } from "../../Axios/axios";
import { getDatabase, ref, push } from "firebase/database";

const CSVUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
      },
    });
  };

  const sanitizeKeys = (obj) => {
  const forbiddenChars = /[.#$/[\]]/g;
  const newObj = {};

  for (const key in obj) {
    const sanitizedKey = key.replace(forbiddenChars, "_");
    newObj[sanitizedKey] = obj[key];
  }

  return newObj;
};

const uploadToFirestore = async () => {
  if (csvData.length === 0) {
    return { success: false, message: "No CSV data found." };
  }

  setLoading(true);
  try {
    const db = getDatabase();
    const profileRef = ref(db, "profile");

    for (const item of csvData) {
      const sanitizedItem = sanitizeKeys(item); // 🧼 Clean keys
      await push(profileRef, sanitizedItem);
    }

    setLoading(false);
    return { success: true, message: "Data uploaded successfully!" };
  } catch (error) {
    console.error("Upload Error:", error);
    setLoading(false);
    return { success: false, message: "Failed to upload data." };
  }
};

  return (
    <div className="p-4 max-w-xl mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        📂 CSV to Firebase (fitbash)
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      <button
        onClick={uploadToFirestore}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload to Firebase"}
      </button>

      <div className="mt-4 text-sm text-gray-600">
        {csvData.length > 0 && `${csvData.length} records ready for upload.`}
      </div>
    </div>
  );
};

export default CSVUploader;
