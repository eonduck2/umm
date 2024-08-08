import React, { useRef, useState } from "react";
import SignUpForm, { SignUpFormRef } from "../../components/sign_up/Form";
import ValiChecker from "src/modules/validation/ValiChecker";

const SignUpPage: React.FC = () => {
  const formRef = useRef<SignUpFormRef>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const ValiArray = [false, false, false, false];
    if (formRef.current) {
      const inputRefs = formRef.current.getInputRefs();

      let pwForCheck = "";

      inputRefs.forEach((inputRef) => {
        if (inputRef?.id === "user-name") {
          ValiArray[0] = ValiChecker.checkName(inputRef.value);
        } else if (inputRef?.id === "sign-up-email") {
          ValiArray[1] = ValiChecker.checkEmail(inputRef.value);
        } else if (inputRef?.id === "sign-up-pw") {
          const pwValidation = ValiChecker.checkPW(inputRef.value);
          ValiArray[2] = pwValidation.valid;
          pwForCheck = inputRef!.value;
        } else if (inputRef?.id === "sign-up-sec-pw") {
          ValiArray[3] = ValiChecker.isEqualTo(inputRef.value, pwForCheck);
        }
      });

      if (ValiArray.every((isValid) => isValid)) {
        try {
          const response = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: inputRefs.find((ref) => ref?.id === "user-name")?.value,
              email: inputRefs.find((ref) => ref?.id === "sign-up-email")
                ?.value,
              password: inputRefs.find((ref) => ref?.id === "sign-up-pw")
                ?.value,
            }),
          });

          if (!response.ok) {
            throw new Error("서버 오류 발생");
          }

          window.location.href = "http://localhost:3000";

          setResponseMessage(`회원 가입 성공`);
        } catch (error) {
          console.error("회원 가입 오류:", error);
          setResponseMessage("회원 가입 중 오류가 발생했습니다.");
        }
      } else {
        setResponseMessage("입력한 정보가 유효 X");
      }
    }
  };

  return (
    <div className="w-svw h-svh">
      <SignUpForm ref={formRef} />
      <button className="w-20 h-6 bg-slate-500" onClick={handleClick}>
        회원 가입
      </button>
      {responseMessage && <p className="text-red-500">{responseMessage}</p>}
    </div>
  );
};

export default SignUpPage;
