#pragma strict
using UnityEngine;

using System.Collections;

 

public class BasicShoot : MonoBehaviour

{

    public RaycastHit hit;

    public int WeaponRange;

    public GameObject GunParticle;

    public AudioClip GunShotSound;

    public Transform SpawnLocation;

    

    void Update()

    {

        if(Input.GetMouseButtonUp(0) && networkView.isMine)

        {

            networkView.RPC("Shoot", RPCMode.All);

        };

    }

    

    [RPC]

    void Shoot()

    {

        Vector3 fwd = transform.TransformDirection(Vector3.forward);

        if (Physics.Raycast(SpawnLocation.position, fwd, out hit, WeaponRange))

        {

            audio.PlayOneShot (GunShotSound);

            Instantiate (GunParticle,hit.point,Quaternion.identity);

        };

    }

}