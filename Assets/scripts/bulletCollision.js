#pragma strict

function OnCollisionEnter(collision : Collision) {
	if (collision.gameObject.transform.tag == "Player")
		collision.gameObject.transform.networkView.RPC("ApplyDamage", RPCMode.All, 5); 
	Destroy (gameObject);
}