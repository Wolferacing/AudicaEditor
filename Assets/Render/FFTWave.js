#pragma strict

	public var material     : Material;

	
	var freqData = 8192;
	private var bufferPoints : ComputeBuffer;
	private var bufferPos    : ComputeBuffer;
	
	private var pos      : Vector3[];
	private var samples  :   float[];	

	
	function Start () {
		Audition ();
	}
	
	function Audition () {

		//make verts
		var verts = [ Vector3(0,.1,0), Vector3(0,-.1,0), Vector3(0,.1,0) ] ;
		
		//make complex array
		
		var pos = new Vector3[ freqData ];
		var samples = new float[ freqData ];
		for ( var i = 0; i < freqData; ++i)
		{
			samples[i]=Mathf.Sin(i/100.0);
			pos[i] = Vector3
			( Random.value*2 , Random.value*2, Random.value*2 );
		}
		
		ReleaseBuffers ();
		
		bufferPoints = new ComputeBuffer (3, 12);
		bufferPoints.SetData (verts);
		material.SetBuffer ("buf_Points", bufferPoints);

		bufferPos = new ComputeBuffer (freqData, 12);
		bufferPos.SetData (pos);
		material.SetBuffer ("buf_Positions", bufferPos);
		
	}
	

	function OnPostRender () {
		if(Time.time<2){material.SetPass (0);
		Graphics.DrawProcedural (MeshTopology.LineStrip, 3, freqData);}
		
	}
	
	function OnDisable() {
		ReleaseBuffers ();
	}
	
	function ReleaseBuffers() {
		if (bufferPoints != null) bufferPoints.Release();
		bufferPoints = null;
		if (bufferPos != null) bufferPos.Release();
		bufferPos = null;
	}	
	
		
	function Update () {

		material.SetInt("offset", 0);
		material.SetInt("skipn", 0);
		material.SetInt("sbpm", 0);
		material.SetInt("sbpmoffset", 0);
		

Audition ();
	}


	
	function OnGUI() {
        // GUI.Label(new Rect(Screen.width/2, 20  , 200, 20), "VYNIL ");
        // GUI.Label(new Rect(5, 100, 170, 700), 
		// "R tag\nY fix\nU span\nI tap\nUp bpm\nDown bpm\nmouse zoom\nP load list\n"+ sbpm +"\n"+songname 
		// );		
    }



