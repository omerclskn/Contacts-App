export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const handlePhoneNumberChange = (value) => {
  let i = 0;
  for (; i < value.length; i++) {
    if (value[i] !== "0") {
      break;
    }
  }
  const number = value.slice(i).replace(/[^\d]/g, "");
  const { length } = number;
  if (length > 3) {
    if (length < 7) return `(${number.slice(0, 3)}) ${number.slice(3)}`;
    else
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)} ${number.slice(
        6,
        10
      )}`;
  } else {
    return number;
  }
};

export const backTopStyle = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};
