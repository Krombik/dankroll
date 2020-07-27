import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
const makeTheme = (isDark: boolean) =>
  responsiveFontSizes(
    createMuiTheme({
      typography: {
        fontFamily: "OpenSans",
        h5: {
          fontWeight: "bold",
          marginBottom: 15,
        },
        h2: {
          fontWeight: "bold",
          marginBottom: 15,
          position: "relative",
        },
        h1: {
          fontWeight: "bold",
          marginTop: 25,
          marginBottom: 25,
          position: "relative",
        },
        body1: {
          position: "relative",
        },
      },
      palette: {
        type: isDark ? "dark" : "light",
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            "@font-face": [
              {
                fontFamily: "OpenSans",
                src: `local('OpenSans'), url('/fonts/OpenSans-Regular.woff2') format('woff2'),
                    url('/fonts/OpenSans-Regular.woff') format('woff'),
                    url('/fonts/OpenSans-Regular.eot') format('eot'),
                    url('/fonts/OpenSans-Regular.svg') format('svg'),
                    url('/fonts/OpenSans-Regular.ttf') format('ttf')`,
                fontWeight: 400,
                fontStyle: "normal",
              },
              {
                fontFamily: "OpenSans",
                src: `local('OpenSans'), url('/fonts/OpenSans-SemiBold.woff2') format('woff2'),
                    url('/fonts/OpenSans-SemiBold.woff') format('woff'),
                    url('/fonts/OpenSans-SemiBold.eot') format('eot'),
                    url('/fonts/OpenSans-SemiBold.svg') format('svg'),
                    url('/fonts/OpenSans-SemiBold.ttf') format('ttf')`,
                fontWeight: 600,
                fontStyle: "normal",
              },
              {
                fontFamily: "OpenSans",
                src: `local('OpenSans'), url('/fonts/OpenSans-Bold.woff2') format('woff2'),
                    url('/fonts/OpenSans-Bold.woff') format('woff'),
                    url('/fonts/OpenSans-Bold.eot') format('eot'),
                    url('/fonts/OpenSans-Bold.svg') format('svg'),
                    url('/fonts/OpenSans-Bold.ttf') format('ttf')`,
                fontWeight: "bold",
                fontStyle: "normal",
              },
            ],
            body: {
              "overflow-x": "hidden",
              "max-width": "100vw",
            },
            header: {
              "& + .MuiContainer-root > form.MuiGrid-container": {
                marginTop: 0,
              },
            },
          },
        },
      },
    })
  );
export default makeTheme;
