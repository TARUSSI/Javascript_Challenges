import { startStopButton, settingButton } from "./variables.js";
import { clickStart, clickSetting } from "./functions.js";

// listening to start/stop button being pressed
startStopButton.addEventListener("click", clickStart);
// listening to setting button being pressed
settingButton.addEventListener("click", clickSetting);
