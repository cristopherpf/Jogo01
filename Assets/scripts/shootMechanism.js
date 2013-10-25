#pragma strict
var prefabBullet:Rigidbody;
var shootForce:float;
var shootPosition:Transform;

//Variaveis para a sincronizaçao
private var lastSynchronizationTime:float = 0f;
private var syncDelay:float = 0f;
private var syncTime:float = 0f;
private var syncStartPosition:Vector3 = Vector3.zero;
private var syncEndPosition:Vector3 = Vector3.zero;

function Update(){
	if (networkView.isMine) {
		if(Input.GetButtonDown("Jump")) {
			var instanceBullet = Instantiate(prefabBullet, shootPosition.position, shootPosition.rotation);
			instanceBullet.rigidbody.AddForce(shootPosition.forward * shootForce);
		}
	}
}

function OnSerializeNetworkView(stream:BitStream, info:NetworkMessageInfo) {
    var syncPosition:Vector3 = Vector3.zero;
    if (stream.isWriting) {
        syncPosition = rigidbody.position;
        stream.Serialize(syncPosition);
    } else {
        stream.Serialize(syncPosition);
 
        syncTime = 0f;
        syncDelay = Time.time - lastSynchronizationTime;
        lastSynchronizationTime = Time.time;
 
        syncStartPosition = rigidbody.position;
        syncEndPosition = syncPosition;
    }
}