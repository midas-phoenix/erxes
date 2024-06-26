module.exports = {
  srcDir: __dirname,
  name: "dailyco",
  scope: "dailyco",
  port: 3101,
  exposes: {
    "./routes": "./src/routes.tsx",
    "./inboxEditorAction": "./src/containers/ManageRoom.tsx",
    "./videoCall": "./src/components/VideoCall.tsx",
  },
  routes: {
    url: "http://localhost:3101/remoteEntry.js",
    scope: "dailyco",
    module: "./routes",
  },

  inboxEditorAction: "./inboxEditorAction",
  videoCall: "./videoCall",
};
