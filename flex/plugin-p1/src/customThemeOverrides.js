const twilioBlue = "#0D122B";
const twilioRed = "#954C08";        // Heading banner color
const white = "#ffffff";
const lightGray = "#e6e6e6";
const darkGray = "#666666";

export default {
  MainHeader: {
    Container: {
      background: twilioRed,
      color: white
    }
  },
  SideNav: {
    Container: {
      background: twilioBlue,
      color: darkGray
    },
    Button: {
      background: twilioBlue,
      color: lightGray,
      lightHover: true
    },
    Icon: {
      color: white
    }
  }
}
