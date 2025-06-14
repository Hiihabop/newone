import axios from "axios";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebase/firebase";

export const db = getDatabase(app);

// all dried_fruit
export const getAll = async (setAlldried_fruit) => {
  try {
    const upiRef = ref(db, "profile");
    const snapshot = await get(upiRef);

    if (snapshot.exists()) {
      const upiData = snapshot.val();

      // Convert the object to an array with 'id' included
      const formattedData = Object.entries(upiData).map(([id, value]) => ({
        id,
        ...value,
      }));

      setAlldried_fruit(formattedData);
    } else {
      console.log("No data available");
      setAlldried_fruit([]); // Set empty array if no data
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setAlldried_fruit([]); // Fail-safe fallback
  }
};

// One item
export const getone = async (setGetoneitem, ind) => {
  try {
    const upiRef = ref(db, `profile/${ind}`);
    const snapshot = await get(upiRef);
    if (snapshot.exists()) {
      const upiData = snapshot.val();
      setGetoneitem(upiData);
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const Account = async (setAC_name) => {
  try {
    const upiRef = ref(db, `comments`);
    const snapshot = await get(upiRef);
    if (snapshot.exists()) {
      const upiData = snapshot.val();
      setAC_name(upiData);
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addProduct = async (productObj) => {
  try {
    const productRef = ref(db, "products");
    await push(productRef, productObj);
    return { success: true, message: "Product added successfully" };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: "Failed to add product" };
  }
};

