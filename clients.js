(function renderCurrentClients() {
  var clients = window.SHAUN_CLIENTS || [];
  var list = document.getElementById("client-list");
  var role = document.getElementById("client-role");

  if (!list || !role || clients.length === 0) {
    return;
  }

  clients.forEach(function addClient(client, index) {
    if (index > 0) {
      var separator = document.createElement("span");
      separator.setAttribute("aria-hidden", "true");
      separator.textContent = "·";
      list.appendChild(separator);
    }

    var link = document.createElement("a");
    link.href = client.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", client.name + " tour dates");
    link.textContent = client.name;
    list.appendChild(link);
  });

  var roles = clients
    .map(function getRole(client) {
      return client.role;
    })
    .filter(function uniqueRole(value, index, allRoles) {
      return value && allRoles.indexOf(value) === index;
    });

  role.textContent = roles.join(" · ");
}());
