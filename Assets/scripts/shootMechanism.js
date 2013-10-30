#pragma strict
var prefabBullet:Rigidbody;
var shootPosition:Transform;
var shootForce:float = 2000;

function Update () {
	if(Input.GetButtonDown("Jump") && networkView.isMine) {
    	networkView.RPC("shoot", RPCMode.AllBuffered);
    }
}

@RPC
function shoot() {
     var instanceBullet = Instantiate(prefabBullet, shootPosition.position, shootPosition.rotation);
     instanceBullet.rigidbody.AddForce(shootPosition.forward * shootForce);
}