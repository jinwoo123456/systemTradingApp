import "@/styles/auth.scss";
import { useState } from "react";
import { formatPhone,removeDash } from "@/utils/FormatUtils";
import { postData } from "@/utils/ApiUtils";
import {validateField,noSpace} from "@/utils/CheckUtils";
import "@/styles/vaildate.scss"
export default function Auth() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const signUpUrl = "/auth/signup";
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

 const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name) {
    validateField(e.currentTarget, "name", "성명을 입력해주세요");
    return;
  }
  if (!email) {
    validateField(e.currentTarget, "email", "이메일을 입력해주세요");
    return;
  }
  if (!phone) {
    validateField(e.currentTarget, "phone", "전화번호를 입력해주세요");
    return;
  }
  if (!password) {
    validateField(e.currentTarget, "password", "비밀번호를 입력해주세요");
    return;
  }
  if (password !== repassword) {
    validateField(e.currentTarget, "repassword", "비밀번호가 일치하지 않습니다.");
    e.currentTarget.repassword.value = "";
    return;
  }
  removeDash(phone);
  let data =  postData(signUpUrl, { name, email, phone, password });
  console.log(data);
};

  return (
    <>
      <a href="https://front.codes/" className="logo" target="_blank">
        <img src="https://assets.codepen.io/1462889/fcy.png" alt="" />
      </a>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <a href="#" className="btn mt-4">submit</a>
                          <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                        </div>
                      </div>
                    </div>
                    {/* 회원가입 영역 */}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">회원가입</h4>
                          <form name="signupForm" onSubmit={handleSignUp}>
                          <div className="form-group">
                            <input type="text" name="name" className="form-style" placeholder="성명" id="name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={noSpace} />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="email" name="email" className="form-style" placeholder="이메일" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={noSpace} />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="tel" name="phone" className="form-style" placeholder="전화번호" id="phone" autoComplete="off" value={phone} onChange={handlePhoneChange} onKeyDown={noSpace} />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="password" className="form-style" placeholder="비밀번호" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={noSpace} />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="repassword" className="form-style" placeholder="비밀번호 재입력" id="repassword" autoComplete="off" value={repassword} onChange={(e) => setRepassword(e.target.value)} onKeyDown={noSpace} />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">가입</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}