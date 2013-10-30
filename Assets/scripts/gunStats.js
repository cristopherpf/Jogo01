#pragma strict

var currentBullet:float = 20;
var maxBullet:float = 20;

function Update () {
	 if (networkView.isMine) {
	 	 GameObject.Find("Bullet Text").guiText.text = "Muniçao: " + currentBullet.ToString() + "/" + maxBullet.ToString();
	 } 
}

@RPC
function SpendBullet(){
    currentBullet -= 1;
}