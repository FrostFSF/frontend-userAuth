//React imports
import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

//Components import
import GoogleLogo from "../assets/google-logo.png";
import AnimationWrapper from "../common/animationwrapper";
import Title from "../components/Title.component";
import { storeInSession } from "../common/sessionControl";
import Input from "../components/Input.component";
import { UserContext } from "../App";

//Libraries import
import axios from "axios";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const UserAuthForm = ({ formType }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { appData: { access_token }, setAppData } = useContext(UserContext);

  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitViaServer = (path, postingData) => {
    axios
      .post(path, postingData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setAppData(data)
      })
      .catch((err) => {
        return toast.error(err.response.data.error);
      });
  };

  const submitDataToEndPoint = (e) => {
    e.preventDefault();
    let { fullname, email, password } = formData;

    if (formType === "signup" && !fullname) {
      return toast.error("Full name is required!");
    }
    if (!email) {
      return toast.error("Email is required!");
    }
    if (!password) {
      return toast.error("Password is required!");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must contain 1 Capital letter, 1 Number and 6-20 characters."
      );
    }

    submitViaServer(
      `https://backend-userauth-frostfsf.onrender.com/${formType}`,
      formType === "signup"
        ? { fullname, email, password }
        : { email, password }
    );
  };

  return (

    access_token ? <Navigate to='/'/> : 

    <AnimationWrapper key={formType}>
      <section className="form w-full h-[82vh] md:h-[90vh] flex items-center justify-center">
        <div>
          {formType === "signin" ? (
            <Title
              text={"Welcome Back"}
              classStyle={"text-5xl font-outfit text-center"}
            />
          ) : (
            <Title
              text={"Join Us Today!"}
              classStyle={"text-5xl font-outfit text-center"}
            />
          )}
          <Toaster />
          <form action="" className="w-[350px] mt-20">
            {formType === "signup" && (
              <div className="relative flex items-center my-4">
                <Input
                  inputType={"text"}
                  name={"fullname"}
                  id={"fullname"}
                  placeholder="Full Name"
                  attr={{ hasSymbol: true, symbolName: "user" }}
                  updateForm={updateFormData}
                />
              </div>
            )}
            <div className="relative flex items-center my-4">
              <Input
                inputType={"email"}
                name={"email"}
                id={"email"}
                placeholder="Email"
                attr={{ hasSymbol: true, symbolName: "at" }}
                updateForm={updateFormData}
              />
            </div>
            <div className="relative flex items-center my-4">
              <Input
                inputType={"password"}
                name={"password"}
                id={"password"}
                placeholder="Password"
                attr={{ hasSymbol: true, symbolName: "lock" }}
                updateForm={updateFormData}
              />
            </div>

            <button
              className="px-5 py-3 rounded-full bg-black text-white mx-auto flex my-10 hover:opacity-80"
              onClick={submitDataToEndPoint}
            >
              {formType === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="relative">
            <hr className="h-[1px] bg-gray-100" />
            <span className="font-outfit bg-white px-3 text-[13px] absolute -top-[0.57rem] left-1/2 -translate-x-1/2">
              OR
            </span>
          </div>

          <button className="flex items-center mt-10 mx-auto bg-black text-white px-5 py-3 rounded-full hover:opacity-80">
            <img src={GoogleLogo} className="w-7 mr-5" />
            Sign {formType === 'signin' ? 'in' : 'up'} with Google
          </button>

          {
            formType === 'signin' ? (<p className="flex items-center justify-center mt-7 text-center">New around here? <Link to='/signup' className="underline flex ml-1">Join Us Today</Link></p>) : (<p className="flex items-center justify-center mt-7 text-center">Already a member? <Link to='/signin' className="underline flex ml-1">Sign In</Link></p>)
          }
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
