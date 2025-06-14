import { useEffect } from "react";
import { get, ref } from "firebase/database";
import { db } from "../Axios/axios";

const LoadGoogleTag = () => {
  useEffect(() => {
    const GoogleTag = async () => {
      try {
        const upiRef = ref(db, `google_gtag`); // 👈 Use /0 if data is stored as array-style
        const snapshot = await get(upiRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const scriptHTML = data.content;

          // Convert string HTML to real DOM elements
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = scriptHTML;

          // Append all scripts to head
          tempDiv.querySelectorAll("script").forEach((script) => {
            const newScript = document.createElement("script");
            if (script.src) {
              newScript.src = script.src;
              newScript.async = true;
            } else {
              newScript.text = script.innerHTML;
            }
            document.head.appendChild(newScript);
          });

        } else {
          console.log("No Google Tag data available.");
        }
      } catch (error) {
        console.error("Error fetching Google Tag script:", error);
      }
    };

    GoogleTag();
  }, []);

  return null; // No JSX rendering needed
};

export default LoadGoogleTag;
