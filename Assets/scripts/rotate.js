#pragma strict

function Update () {

	if (networkView.isMine) {
		if(Input.GetKey("q")){
			transform.Rotate(0,-5,0);
		}
	
		if(Input.GetKey("e")){
			transform.Rotate(0,5,0);
		}
	}
	
}