#pragma strict

var currentHp : float = 100;
var maxHp : float = 100;
 
function Update () {
	 if (networkView.isMine) {
	 	 GameObject.Find("Hp Text").guiText.text = "HP: " + currentHp.ToString() + "/" + maxHp.ToString();
	 	 
		 if(currentHp <= 0) {
			Network.Destroy(this.gameObject);
		 }
	 } 
}
 
@RPC
function ApplyDamage(damage: int){
    currentHp -= damage;  
}