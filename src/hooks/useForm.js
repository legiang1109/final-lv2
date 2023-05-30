import { useContext, useState } from "react";
import commonContext from "../contexts/common/commonContext";
import { getUser, createUser } from "../data/registerData";
// import { setUser, getUser } from "../data/registerData";

const useForm = () => {
  const { toggleForm, setFormUserInfo } = useContext(commonContext);
  const [inputValues, setInputValues] = useState({});
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const handleInputValues = (e) => {
    const { name, value } = e.target;

    let newinputvalue = (prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    };

    setInputValues(newinputvalue);
  };
  // Handle Signup

  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
  };

  const handleRegister = (inputdata) => {
    const { username, mail, password, conf_password } = inputdata;

    if (password === conf_password) {
      getUser(mail, password)
        .then(({ data }) => {
          if (data.length > 0 && data[0].mail === mail) {
            alert("Email  đã tồn tại");
            setIsSignupVisible(true);

            return;
          } else {
            alert("you're successfully sign up");
            createUser(inputdata);
            setIsSignupVisible(false);
          }
        })
        .catch((err) => {
          console.log("Loi he thong xay ra" + err);
        });
    } else {
      alert("Mật khẩu không trùng khớp");
      setIsSignupVisible(true);
    }
  };

  const handleLogin = (inputdata) => {
    const { mail, password } = inputdata;
    console.log(mail);
    console.log(password);
    getUser(mail, password)
      .then(({ data }) => {
        if (
          data.length > 0 &&
          data[0].mail === mail &&
          data[0].password === password
        ) {
          alert(" Đăng nhập thành công");
          localStorage.setItem("user_token", data[0].id);
          const loggedUserInfo = inputValues.mail.split("@")[0].toUpperCase();
          toggleForm(false);
          setFormUserInfo(loggedUserInfo);
        } else {
          alert("Ten tai khoan hoac mat khau ko dung");
          setIsSignupVisible(false);
        }
      })
      .catch((err) => {
        console.log("Loi he thong xay ra" + err);
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSignupVisible) {
      handleRegister(inputValues);
      // setIsSignupVisible(false);

      // n
    } else {
      handleLogin(inputValues);
    }
    setInputValues({});
    // phần cũ bên dưới
  };

  return {
    inputValues,
    handleInputValues,
    handleFormSubmit,
    isSignupVisible,
    handleIsSignupVisible,
  };
};

export default useForm;
//check
