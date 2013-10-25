#pragma strict

var velocidadeMovimento:float = 3;
var velocidadeRotacao:float = 2;
//Variaveis para a sincronizaçao
private var lastSynchronizationTime:float = 0f;
private var syncDelay:float = 0f;
private var syncTime:float = 0f;
private var syncStartPosition:Vector3 = Vector3.zero;
private var syncEndPosition:Vector3 = Vector3.zero;

function Start() {
	if (networkView.isMine) {
		var cam:GameObject = GameObject.Find("Camera");
		cam.GetComponent(SmoothFollow).target = transform;
	}
}

function Update () {
	if (networkView.isMine) {
		mover();
	}
}

function mover() {
	var forcaMovimento = Input.GetAxis("Vertical") * velocidadeMovimento;
	var forcaRotacao = Input.GetAxis("Horizontal") * velocidadeRotacao;
	
	transform.Rotate(0, forcaRotacao, 0);
	transform.position += transform.forward * forcaMovimento * Time.deltaTime;
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