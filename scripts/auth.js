// auth.js
// - 로그인 및 회원가입 페이지에서 공통으로 사용하는 자바스크립트 파일
// - form 유효성 검증, 비밀번호 표시 토글 기능 등을 담당
document.addEventListener("DOMContentLoaded", function() {

  // 유효성 검증 상태를 추적하는 변수들
  // - 각 입력 필드의 유효성 상태를 boolean 값으로 관리
  let isEmailValid = false;
  let isNicknameValid = false;
  let isPasswordValid = false;
  let isPasswordConfirmationValid = false;

  // DOM 요소 선택
  // - ID 선택자를 사용하여 각 입력 필드와 폼 요소를 변수에 할당
  const loginForm = document.getElementById("login_form");
  const signupForm = document.getElementById("signup_form");
  const emailInput = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById("confirm_password");
  const submitButton = document.querySelector(
    '.auth_container form button[type="submit"]'
  );
  // // 페이지 로드 시 제출 버튼의 비활성화 상태를 설정
  // updateSubmitButtonState();

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); 
      window.location.href = "index.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.href = "login.html";
    });
  }

  function showError(input, errorId, message, errorClass = "error-message") {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.className = errorClass;
      errorElement.style.display = "block";
    }
    if (input) {
      input.style.border = "1px solid #f74747";
    }
  }

  function hideError(input, errorSpanId) {
    const errorElement = document.getElementById(errorSpanId);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
    if (input) {
      input.style.border = "none";
    }
  }

  // 이메일 정규식으로 검증
  // - 이메일 형식이 올바른지 확인하는 함수
  // - 정규 표현식을 사용하여 이메일 패턴 매칭
  // - 이메일 형식이 올바르면 true, 아니면 false 반환
  //  (참고: 완벽한 이메일 검증은 불가능하며, 여기서는 일반적인 형식만 검사)
  function validateEmail(email) {
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailReg.test(email);
  }

  // 이메일 필드의 유효성 검사
  function checkEmailValidity() {
    const emailValue = emailInput.value.trim();
    // 입력값이 없거나 형식이 올바르지 않으면 false, 둘 다 통과하면 true
    // trim() 메서드는 문자열의 앞뒤 공백을 제거

    isEmailValid = false;
    hideError(emailInput, "emailError");

    if (!emailValue) {
      showError(emailInput, "emailError", "이메일을 입력해 주세요.");
    } else if (!validateEmail(emailValue)) {
      showError(emailInput, "emailError", "이메일 형식이 올바르지 않습니다.");
    } else {
      isEmailValid = true;
      hideError(emailInput, "emailError");
    }
  }

  // 닉네임 필드의 유효성 검사
  function checkNicknameValidity() {
    const nicknameValue = nicknameInput.value.trim();
    isNicknameValid = false;
    hideError(nicknameInput, "nicknameError");

    if (!nicknameValue) {
      showError(nicknameInput, "nicknameError", "닉네임을 입력해 주세요.");
    } else {
      isNicknameValid = true;
      hideError(nicknameInput, "nicknameError");
    }
  }

  // 비밀번호 필드의 유효성 검사
  function checkPasswordValidity() {
    const passwordValue = passwordInput.value.trim();
    isPasswordValid = false;

    hideError(passwordInput, "passwordError");

    if (!passwordValue) {
      showError(passwordInput, "passwordError", "비밀번호를 입력해 주세요.");
    } else if (passwordValue.length < 8) {
      showError(passwordInput, "passwordError", "비밀번호는 8자 이상이어야 합니다.");
    } else {
      isPasswordValid = true;
      hideError(passwordInput, "passwordError");
    }

    if (signupForm) {
      checkPasswordConfirmationValidity();
    }
  }

  // 비밀번호 확인 필드의 유효성 검사
  function checkPasswordConfirmationValidity() {
    const passwordConfirmationValue = passwordConfirmationInput.value.trim();
    isPasswordConfirmationValid = false;

    hideError(passwordConfirmationInput, "passwordConfirmationError");

    if (!isPasswordValid) {
      showError(passwordConfirmationInput, "passwordConfirmationError", "비밀번호를 입력해 주세요.");
    } else if (
      !passwordConfirmationValue ||
      passwordConfirmationValue !== passwordInput.value.trim()
    ) {
      showError(passwordConfirmationInput, "passwordConfirmationError", "비밀번호가 일치하지 않습니다.");
    } else {
      isPasswordConfirmationValid = true;
      hideError(passwordConfirmationInput, "passwordConfirmationError");
    }
  }

  function updateSubmitButtonState() {
    let isFormValid = isEmailValid && isPasswordValid;

    if (signupForm) {
      isFormValid = isEmailValid && isNicknameValid && isPasswordConfirmationValid;
    }

    // isFormValid의 값에 따라 선택된 제출 버튼의 disabled와 pointer 속성을 변경
    submitButton.disabled = !isFormValid;
    submitButton.style.cursor = isFormValid ? "pointer" : "not-allowed";
  }
  

  // 입력 필드에 이벤트 리스너 추가
  if (emailInput) {
    emailInput.addEventListener("focusout", function() {
      checkEmailValidity();
      updateSubmitButtonState();
    });
  }
  if (nicknameInput) {
    nicknameInput.addEventListener("focusout", function() {
      checkNicknameValidity();
      updateSubmitButtonState();
    });
  }
  if (passwordInput) {
    passwordInput.addEventListener("input", function() {
      checkPasswordValidity();
      updateSubmitButtonState();
    });
  }
  if (passwordConfirmationInput) {
    passwordConfirmationInput.addEventListener("input", function() {
      checkPasswordConfirmationValidity();
      updateSubmitButtonState();
    });
  }

  // toggle 버튼 동작
  function togglePasswordVisibility(event) {
    const button = event.currentTarget;
    const inputField = button.parentElement.querySelector("input");
    const toggleIcon = button.querySelector(".password-toggle-img");

    inputField.classList.toggle("visible");

    // input type 변경
    if (inputField.classList.contains("visible")) {
      inputField.type = "text";
      toggleIcon.src = "images/input/visible_input.svg";
      toggleIcon.alt = "비밀번호 표시";
      button.setAttribute("aria-label", "비밀번호 숨기기");
    } else {
      inputField.type = "password";
      toggleIcon.src = "images/input/invisible_input.svg";
      toggleIcon.alt = "비밀번호 숨기기";
      button.setAttribute("aria-label", "비밀번호 보기");
    }
  }

  const toggleButtons = document.querySelectorAll(".password-toggle-button");
  toggleButtons.forEach((button) =>
    button.addEventListener("click", togglePasswordVisibility)
  );  

});