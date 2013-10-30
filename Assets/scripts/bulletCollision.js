#pragma strict
var shootPower : float = 10;

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.transform.tag == "Player")
		collision.gameObject.transform.networkView.RPC("ApplyDamage", RPCMode.All, shootPower); 
	Destroy (gameObject);
}