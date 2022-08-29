self.onmessage = function (message) {
   fetch(message.data).then((response) =>
      response.arrayBuffer().then((resource) =>
         self.postMessage(resource, [resource])));
};
