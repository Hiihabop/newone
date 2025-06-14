import { useEffect, useState } from "react";
import Header_payment from "../Components/Header_payment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Input } from "../Components/Button";
import Payment_footer from "../Components/Payment_footer";
import { Account } from "../Axios/axios";
import { State } from "country-state-city";

const AddCard = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const steps = ["Cart", "Address", "Payment", "Summary"];

  const [formData, setFormData] = useState({
    fullname: "",
    mobalinumber: "",
    pincode: "",
    city: "",
    housename: "",
    roadname: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full Name is required";
    if (!formData.mobalinumber) {
      newErrors.mobalinumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobalinumber)) {
      newErrors.mobalinumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    if (!formData.city) newErrors.city = "City is required";
    if (!formData.housename) newErrors.housename = "House name is required";
    if (!formData.roadname) newErrors.roadname = "Area/Colony is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      nextStep();
    }
  };

  const upiOptions = [
    {
      label: "Google Pay",
      value: "Google Pay",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/gpay.png",
    },
    {
      label: "PhonePe",
      value: "PhonePe",
      offer: "20% Cashback in 24 hour",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/phonepay.png",
    },
    {
      label: "Paytm",
      value: "Paytm",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745664838/IPL_TIME_LOGO/Icon/paytm.svg",
    },
    {
      label: "All UPI APP",
      value: "All UPI APP",
      icon: "https://res.cloudinary.com/dvnpk9ikw/image/upload/v1745665251/IPL_TIME_LOGO/Icon/ea5vgtntqxifynpywtch.png",
    },
  ];

  const [selected, setSelected] = useState("");

  const [AC_name, setAC_name] = useState([]);

  useEffect(() => {
    Account(setAC_name);
  }, []);

  const openUPIApp = () => {
    const upiId = AC_name.body;
    const site_name = "site_name";
    const tmp_site_name = "Meesho Payment";
    let upiUrl = "";
    const paymentAmount = cartTotal;

    if (selected === "Google Pay") {
      upiUrl = `tez://upi/pay?pa=${upiId}&pn=${site_name}&am=${paymentAmount}&cu=INR&tn=${tmp_site_name}`;
    } else if (selected === "PhonePe") {
      upiUrl = `phonepe://pay?pa=${upiId}&pn=${site_name}&am=${paymentAmount}&cu=INR&tn=${tmp_site_name}`;
    } else if (selected === "Paytm") {
      upiUrl = `paytmmp://pay?pa=${upiId}&pn=${site_name}&am=${paymentAmount}&cu=INR&tn=${tmp_site_name}`;
    } else if (selected === "All UPI APP") {
      upiUrl = `upi://pay?pa=${upiId}&pn=${site_name}&am=${paymentAmount}&cu=INR&tn=${tmp_site_name}`;
    }

    const opened = window.open(upiUrl, "_self");

    setTimeout(() => {
      if (!opened) {
        alert("Unable to open UPI app.");
      }
    }, 500);
  };

  const [itemsget, setitemsget] = useState([]);

  useEffect(() => {
    getitems();
  }, []);

  const getitems = () => {
    const items = JSON.parse(localStorage.getItem("cart"));
    setitemsget(items);
  };

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartTotal(calculateTotal());
  }, [itemsget]);

  const calculateTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach((item) => {
      total += item.selling_price * (parseInt(item.Qty) || 1);
    });
    return total.toFixed(2);
  };

  const deleteCartItemById = (id) => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cartData.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    getitems();
  };

  const [states, setStates] = useState([]);

  useEffect(() => {
    // Fetch all states of India (country code: "IN")
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  return (
    <div>
      {step == 1 && <Header_payment to={"/"} text="CART" />}
      {step == 2 && <Header_payment onclick={prevStep} text="Back" />}
      {step == 3 && <Header_payment onclick={prevStep} text="PAYMENT" />}

      <div className="max-w-2xl mx-auto p-[16px] font-sans pt-0 max-h-screen">
        <div className="flex items-center justify-between w-full mb-6 relative mt-4">
          {steps.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full relative"
            >
              {/* Circle */}
              <div
                className={`h-7 w-7 z-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  step === index + 1
                    ? "border-[#273b53] text-[#273b53] bg-white"
                    : step > index + 1
                    ? "bg-[#273b53] text-white border-[#273b53]"
                    : "border-gray-300 text-gray-400 bg-white"
                }`}
              >
                {index + 1}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium ${
                  step >= index + 1 ? "text-blue-800" : "text-gray-400"
                }`}
              >
                {label}
              </span>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-3.5 left-1/2 h-0.5 w-full ${
                    step > index + 1 ? "bg-blue-800" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* staep 1 */}
        {step === 1 && (
          <div className="space-y-4 border-t-2 overflow-auto">
            {itemsget.map((e, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center gap-2"
                >
                  <img
                    className="w-[100px] h-[100px] object-cover"
                    src={e.img1}
                    alt="Product"
                  />
                  <div className="w-64">
                    <h2 className="font-semibold text-lg line-clamp-2">
                      {e.name}
                    </h2>
                    <div className="flex items-center">
                      <div className="text-black font-bold text-sm">
                        ₹{e.selling_price}.00
                      </div>
                      <div className="text-gray-700 line-through text-sm ml-3">
                        ₹{e.mrp}.00
                      </div>
                    </div>
                  </div>
                  {/* Quantity and Delete Button */}
                  <div className="flex flex-col items-center justify-between h-full ">
                    <button className="text-red-500 mb-3">
                      <RiDeleteBin6Line
                        onClick={() => deleteCartItemById(e.id)}
                        className="text-xl"
                      />
                    </button>
                    <p className="text-xs text-nowrap font-medium pt-3">
                      Qty: {e.Qty}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Order Summary */}
            <div className="border-t-4 pt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-sm">Shipping:</span>
                <span className="font-semibold text-sm">FREE</span>
              </div>
              <div className="flex mt-3 justify-between underline decoration-dotted">
                <span className="text-sm font-medium ">
                  Total Product Price:
                </span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between font-medium border-t-2 border-b-4 mt-3 py-3 pb-20">
                <span>Order Total:</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>
        )}

        {/* staep 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <form>
              <Input
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                error={errors.fullname}
                type="text"
              />
              <Input
                label="Mobile number"
                name="mobalinumber"
                value={formData.mobalinumber}
                onChange={handleChange}
                error={errors.mobalinumber}
                type="tel"
              />
              <Input
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
                type="text"
              />

              <div className="flex space-x-2 mt-4">
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  className={`border w-full p-2 rounded ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.city}
                  onChange={handleChange}
                />
                <select className="border w-full p-2 rounded">
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}

              <Input
                label="House No., Building Name"
                name="housename"
                value={formData.housename}
                onChange={handleChange}
                error={errors.housename}
              />
              <Input
                label="Road name, Area, Colony"
                name="roadname"
                value={formData.roadname}
                onChange={handleChange}
                error={errors.roadname}
              />
            </form>
          </div>
        )}

        {/* staep 3 */}
        {step === 3 && (
          <div className="space-y-4 border-t-2 pt-4">
            <p className="font-semibold">Select Payment Method</p>
            <div className="p-4 bg-blue-100 rounded flex justify-center font-medium items-center">
              <video
                src="https://dry.fryfruitnuts.shop/assets/cod_lat.webm"
                className="h-8"
                autoPlay
                loop
                muted
                playsInline
              />
              <span>Pay online & get EXTRA ₹33 off</span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-xs text-black whitespace-nowrap mr-2">
                PAY ONLINE
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* <UPIPaymentAccordion/> */}
            <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.meesho.com/files/headless/upi_ppr.png"
                  alt=""
                  className="w-5 h-4"
                />
                <h2 className="font-medium pl-3">UPI (GPay/PhonePe/Paytm)</h2>
              </div>
              {upiOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-between border-t py-3 cursor-pointer ${
                    selected === option.value ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="upi"
                      className="form-radio text-blue-500"
                      checked={selected === option.value}
                      onChange={() => setSelected(option.value)}
                    />
                    <span className="font-medium">{option.label}</span>
                    {option.offer && (
                      <span className="text-green-600 text-sm font-semibold">
                        {option.offer}
                      </span>
                    )}
                  </div>
                  <img
                    src={option.icon}
                    alt={option.label}
                    className="w-6 h-6"
                  />
                </label>
              ))}
            </div>
            <div className="border-t pt-2">
              <div className="flex text-sm font-medium justify-between">
                <span>Shipping :</span>
                <span>FREE</span>
              </div>
              <div className="flex text-sm font-medium justify-between mt-3">
                <span>Total Product Price :</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between font-medium mt-4 pt-3 border-t-2 pb-32">
                <span>Order Total:</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px]">
          {step < 4 ? (
            step === 2 ? (
              <button
                onClick={handleSubmit}
                className="bg-[#273b53] w-full py-4 text-white rounded-lg text-sm"
              >
                Save Address and Continue
              </button>
            ) : step === 3 ? (
              <Payment_footer
                disabled={!selected}
                onClick={openUPIApp}
                B_text="PayNow"
                res={cartTotal}
              />
            ) : (
              <Payment_footer
                onClick={nextStep}
                B_text="Continue"
                res={cartTotal}
              />
            )
          ) : (
            <span className="text-green-600 font-bold">Order Completed!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCard;
