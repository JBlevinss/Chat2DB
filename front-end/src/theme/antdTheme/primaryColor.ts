import { PrimaryColorType } from "@/constants/common"


type IAntdPrimaryColor = {
  [key in PrimaryColorType]: any;
}

const antdPrimaryColor: IAntdPrimaryColor = {
  [PrimaryColorType.Polar_Green]: {
    "custom-name": "polar-green",
    "colorPrimary": "#3c8618",
  },
  [PrimaryColorType.Golden_Purple]: {
    "custom-name": "golden-purple",
    "colorPrimary": "#51258f",
  },
  [PrimaryColorType.Polar_Blue]: {
    "custom-name": "polar-blue",
    "colorPrimary": "#1677ff",
  }
}

export default antdPrimaryColor