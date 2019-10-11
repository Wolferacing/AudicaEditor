Shader "DX11/fftshader" {
SubShader {
Pass {

CGPROGRAM
#pragma target 5.0

#pragma vertex vert
#pragma fragment frag

#include "UnityCG.cginc"

StructuredBuffer<float3> buf_Points;
StructuredBuffer<float3> buf_Positions;

struct ps_input {
	float4 pos : SV_POSITION;
	float4 col : COLOR;
};

ps_input vert (uint id : SV_VertexID , uint inst : SV_InstanceID)
{
	ps_input o;
	
	float3 worldPos = 
	buf_Points[id]  *  buf_Positions[inst].y  *  10 
	+ float3 (   buf_Positions[inst].x ,  buf_Positions[inst].y-4  , 0);
	
	o.pos = mul (UNITY_MATRIX_VP, float4(worldPos,1.0f));
	o.col = float4(sin(inst/1700)/4+.75,sin(inst/2300)/4+.75,sin(inst/7100)/4+.75,1);
	return o;
}

float4 frag (ps_input i) : COLOR
{
	//return float4(1,0.5f,0.0f,1);
	return i.col;//
}

ENDCG

}
}

Fallback Off
}
