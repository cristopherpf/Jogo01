#pragma strict

var playerPrefab:GameObject;
var respawnPoint:Transform;
var typeName = "UniqueGameName";
var gameName = "RoomName";
var hostList:HostData[];
 
function StartServer() {
	//Quantidade de Players / porta
    Network.InitializeServer(4, 25000, !Network.HavePublicAddress());
    MasterServer.RegisterHost(typeName, gameName);
}

function OnServerInitialized() {
	SpawnPlayer();
    Debug.Log("Server Initializied");
}

function OnGUI() {
    if (!Network.isClient && !Network.isServer) {
        if (GUI.Button(new Rect(100, 100, 250, 100), "Start Server"))
            StartServer();
 
        if (GUI.Button(new Rect(100, 250, 250, 100), "Refresh Hosts"))
            RefreshHostList();
 
        if (hostList != null) {
            for (var i = 0; i < hostList.Length; i++) {
                if (GUI.Button(new Rect(400, 100 + (110 * i), 300, 100), hostList[i].gameName))
                    JoinServer(hostList[i]);
            }
        }
    }
}

function RefreshHostList() {
    MasterServer.RequestHostList(typeName);
}
 
function OnMasterServerEvent(msEvent:MasterServerEvent) {
    if (msEvent == MasterServerEvent.HostListReceived)
        hostList = MasterServer.PollHostList();
}

function JoinServer(hostData:HostData) {
    Network.Connect(hostData);
}
 
function OnConnectedToServer() {
	SpawnPlayer();
    Debug.Log("Server Joined");
}

function SpawnPlayer() {
	Network.Instantiate(playerPrefab, respawnPoint.position, Quaternion.identity, 0);	
}