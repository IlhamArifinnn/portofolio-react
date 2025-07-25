import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

export function Robot(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/somerobot.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions?.idle?.play(); // ganti 'idle' dengan nama animasi robot
  }, [actions]);

  // set pivot di tengah badan robot (bisa diubah)
  const targetRotation = useRef(0); // hanya sumbu Y

  useFrame((state, delta) => {
    // 1. hitung sudut (radians) dari posisi mouse ke pivot
    //    state.mouse : [-1 .. 1] di layar
    targetRotation.current = Math.atan2(
      state.mouse.x, // x
      1 // z (tetap di 1 agar hanya yaw)
    );

    // 2. easing ke rotasi baru
    easing.dampE(
      group.current.rotation,
      [0, targetRotation.current, 0], // [x,y,z]
      0.4, // kecepatan easing
      delta
    );
  });

  useFrame((state, delta) => {
    // ambil hanya yaw (sumbu Y) dan batasi
    const target = Math.atan2(state.mouse.x, 1) * 0.4; // kurangi faktor
    const clamped = THREE.MathUtils.clamp(target, -Math.PI / 4, Math.PI / 4);

    easing.dampE(
      group.current.rotation,
      [0, clamped, 0],
      0.1, // lebih lambat
      delta
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="somerobotfbx"
            rotation={[Math.PI / 2.5, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="rig" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_5">
                    <group name="root_07">
                      <primitive object={nodes["DEF-spine_08"]} />
                      <group
                        name="VIS_upper_arm_ik_poleL_016"
                        position={[0.603, 0.006, 0.558]}
                        rotation={[0.281, -0.234, -1.732]}
                        scale={[1, 16.885, 1]}
                      >
                        <group
                          name="VIS_upper_arm_ik_poleL_end_017"
                          position={[0, 0.074, 0]}
                        >
                          <group
                            name="VIS_upper_arm_ik_poleL_end_end_0559"
                            position={[0, 0.074, 0]}
                          />
                        </group>
                      </group>
                      <group
                        name="VIS_upper_arm_ik_poleR_018"
                        position={[-0.627, -0.004, 0.568]}
                        rotation={[0.278, 0.228, 1.73]}
                        scale={[1, 16.516, 1]}
                      >
                        <group
                          name="VIS_upper_arm_ik_poleR_end_019"
                          position={[0, 0.074, 0]}
                        >
                          <group
                            name="VIS_upper_arm_ik_poleR_end_end_0540"
                            position={[0, 0.074, 0]}
                          />
                        </group>
                      </group>
                      <group
                        name="VIS_thigh_ik_poleL_020"
                        position={[0.36, -0.067, -0.895]}
                        rotation={[-3.135, -0.441, -0.213]}
                        scale={[1, 16.51, 1]}
                      >
                        <group
                          name="VIS_thigh_ik_poleL_end_021"
                          position={[0, 0.127, 0]}
                        >
                          <group
                            name="VIS_thigh_ik_poleL_end_end_0562"
                            position={[0, 0.127, 0]}
                          />
                        </group>
                      </group>
                      <group
                        name="VIS_thigh_ik_poleR_022"
                        position={[-0.368, -0.079, -0.893]}
                        rotation={[-3.132, 0.439, 0.21]}
                        scale={[1, 16.405, 1]}
                      >
                        <group
                          name="VIS_thigh_ik_poleR_end_023"
                          position={[0, 0.127, 0]}
                        >
                          <group
                            name="VIS_thigh_ik_poleR_end_end_0563"
                            position={[0, 0.127, 0]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-torsoparent_024"
                      position={[0, 0.025, 0.168]}
                    >
                      <group name="torso_025">
                        <group name="hips_026" position={[0, -0.127, 0.432]}>
                          <group name="hips_end_027" position={[0, 0.345, 0]}>
                            <group
                              name="hips_end_end_0564"
                              position={[0, 0.345, 0]}
                            />
                          </group>
                        </group>
                        <group name="chest_028" position={[0, -0.127, 0.432]}>
                          <group name="chest_end_029" position={[0, 0.46, 0]}>
                            <group
                              name="chest_end_end_0565"
                              position={[0, 0.46, 0]}
                            />
                          </group>
                        </group>
                        <group
                          name="MCH-spine001_030"
                          position={[0, -0.127, 0.432]}
                        >
                          <group
                            name="spine_fk001_031"
                            rotation={[1.687, 0, 0]}
                          >
                            <group
                              name="MCH-spine_032"
                              position={[0, -0.192, 0]}
                              rotation={[-1.687, 0, 0]}
                            >
                              <group
                                name="spine_fk_033"
                                rotation={[1.979, 0, 0]}
                              >
                                <group
                                  name="tweak_spine_034"
                                  position={[0, -0.526, 0]}
                                >
                                  <group name="ORG-spine_035">
                                    <group
                                      name="ORG-pelvisL_036"
                                      position={[0, -0.002, 0.001]}
                                      rotation={[-1.928, -0.576, -2.571]}
                                    >
                                      <primitive
                                        object={nodes["DEF-pelvisL_037"]}
                                      />
                                    </group>
                                    <group
                                      name="ORG-pelvisR_039"
                                      position={[0, -0.002, 0.001]}
                                      rotation={[-1.928, 0.576, 2.571]}
                                    >
                                      <primitive
                                        object={nodes["DEF-pelvisR_040"]}
                                      />
                                    </group>
                                    <group
                                      name="ORG-thighL_042"
                                      position={[0.287, 0.084, 0.168]}
                                      rotation={[2.707, -0.183, -0.089]}
                                    >
                                      <group
                                        name="ORG-shinL_043"
                                        position={[0, 0.835, 0]}
                                        rotation={[0.203, 0, 0]}
                                      >
                                        <group
                                          name="ORG-footL_044"
                                          position={[0, 1.267, 0]}
                                          rotation={[-1.401, -0.011, 0.212]}
                                        >
                                          <group
                                            name="ORG-toeL_045"
                                            position={[0, 0.417, 0]}
                                            rotation={[2.866, 0.001, -3.12]}
                                          >
                                            <group
                                              name="ORG-toeL_end_046"
                                              position={[0, 0.188, 0]}
                                            >
                                              <group
                                                name="ORG-toeL_end_end_0568"
                                                position={[0, 0.188, 0]}
                                              />
                                            </group>
                                          </group>
                                          <group
                                            name="ORG-heel02L_047"
                                            position={[-0.228, 0.221, 0.096]}
                                            rotation={[1.216, -0.01, -1.57]}
                                          >
                                            <group
                                              name="ORG-heel02L_end_048"
                                              position={[0, 0.44, 0]}
                                            >
                                              <group
                                                name="ORG-heel02L_end_end_0569"
                                                position={[0, 0.44, 0]}
                                              />
                                            </group>
                                          </group>
                                          <group name="MCH-foot_tweakL_049">
                                            <group name="foot_tweakL_050">
                                              <group
                                                name="foot_tweakL_end_051"
                                                position={[0, 0.104, 0]}
                                              >
                                                <group
                                                  name="foot_tweakL_end_end_0570"
                                                  position={[0, 0.104, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                        <group name="MCH-shin_tweakL_052">
                                          <group name="shin_tweakL_053">
                                            <group
                                              name="shin_tweakL_end_054"
                                              position={[0, 0.317, 0]}
                                            >
                                              <group
                                                name="shin_tweakL_end_end_0571"
                                                position={[0, 0.317, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-shin_tweakL001_055"
                                          position={[0, 0.633, 0]}
                                          rotation={[0, 0.073, 0]}
                                        >
                                          <group
                                            name="shin_tweakL001_056"
                                            rotation={[0, -0.073, 0]}
                                          >
                                            <group
                                              name="shin_tweakL001_end_057"
                                              position={[0, 0.317, 0]}
                                            >
                                              <group
                                                name="shin_tweakL001_end_end_0572"
                                                position={[0, 0.317, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <group name="MCH-thigh_parent_widgetL_058">
                                        <group
                                          name="MCH-thigh_parent_widgetL_end_059"
                                          position={[0, 0.07, 0]}
                                        >
                                          <group
                                            name="MCH-thigh_parent_widgetL_end_end_0573"
                                            position={[0, 0.07, 0]}
                                          />
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-thigh_tweakL001_060"
                                        position={[0, 0.417, 0]}
                                      >
                                        <group name="thigh_tweakL001_061">
                                          <group
                                            name="thigh_tweakL001_end_062"
                                            position={[0, 0.209, 0]}
                                          >
                                            <group
                                              name="thigh_tweakL001_end_end_0574"
                                              position={[0, 0.209, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="ORG-thighR_063"
                                      position={[-0.287, 0.084, 0.168]}
                                      rotation={[2.691, 0.181, 0.099]}
                                      scale={0.998}
                                    >
                                      <group
                                        name="ORG-shinR_064"
                                        position={[0, 0.835, 0]}
                                        rotation={[0.229, 0, 0]}
                                        scale={1.001}
                                      >
                                        <group
                                          name="ORG-footR_065"
                                          position={[0, 1.267, 0]}
                                          rotation={[-1.42, 0.02, -0.213]}
                                          scale={1.001}
                                        >
                                          <group
                                            name="ORG-toeR_066"
                                            position={[0, 0.417, 0]}
                                            rotation={[2.866, -0.001, 3.12]}
                                          >
                                            <group
                                              name="ORG-toeR_end_067"
                                              position={[0, 0.188, 0]}
                                            >
                                              <group
                                                name="ORG-toeR_end_end_0575"
                                                position={[0, 0.188, 0]}
                                              />
                                            </group>
                                          </group>
                                          <group
                                            name="ORG-heel02R_068"
                                            position={[0.228, 0.221, 0.096]}
                                            rotation={[-1.926, -0.01, 1.571]}
                                          >
                                            <group
                                              name="ORG-heel02R_end_069"
                                              position={[0, 0.44, 0]}
                                            >
                                              <group
                                                name="ORG-heel02R_end_end_0576"
                                                position={[0, 0.44, 0]}
                                              />
                                            </group>
                                          </group>
                                          <group name="MCH-foot_tweakR_070">
                                            <group name="foot_tweakR_071">
                                              <group
                                                name="foot_tweakR_end_072"
                                                position={[0, 0.104, 0]}
                                              >
                                                <group
                                                  name="foot_tweakR_end_end_0577"
                                                  position={[0, 0.104, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-shin_tweakR_073"
                                          scale={1.001}
                                        >
                                          <group name="shin_tweakR_074">
                                            <group
                                              name="shin_tweakR_end_075"
                                              position={[0, 0.317, 0]}
                                            >
                                              <group
                                                name="shin_tweakR_end_end_0578"
                                                position={[0, 0.317, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-shin_tweakR001_076"
                                          position={[0, 0.633, 0]}
                                          rotation={[0, -0.071, 0]}
                                          scale={1.001}
                                        >
                                          <group
                                            name="shin_tweakR001_077"
                                            rotation={[0, 0.073, 0]}
                                          >
                                            <group
                                              name="shin_tweakR001_end_078"
                                              position={[0, 0.317, 0]}
                                            >
                                              <group
                                                name="shin_tweakR001_end_end_0579"
                                                position={[0, 0.317, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-thigh_parent_widgetR_079"
                                        scale={1.002}
                                      >
                                        <group
                                          name="MCH-thigh_parent_widgetR_end_080"
                                          position={[0, 0.07, 0]}
                                        >
                                          <group
                                            name="MCH-thigh_parent_widgetR_end_end_0580"
                                            position={[0, 0.07, 0]}
                                          />
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-thigh_tweakR001_081"
                                        position={[0, 0.417, 0]}
                                        scale={1.002}
                                      >
                                        <group name="thigh_tweakR001_082">
                                          <group
                                            name="thigh_tweakR001_end_083"
                                            position={[0, 0.209, 0]}
                                          >
                                            <group
                                              name="thigh_tweakR001_end_end_0560"
                                              position={[0, 0.209, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="thigh_parentL_084"
                                      position={[0.287, 0.084, 0.168]}
                                      rotation={[2.731, 0.088, -0.088]}
                                    >
                                      <group
                                        name="thigh_parentL_end_085"
                                        position={[0, 0.209, 0]}
                                      >
                                        <group
                                          name="thigh_parentL_end_end_0561"
                                          position={[0, 0.209, 0]}
                                        />
                                      </group>
                                    </group>
                                    <group
                                      name="MCH-thigh_parentL_086"
                                      position={[0.287, 0.084, 0.168]}
                                      rotation={[-1.979, 0, 0]}
                                    >
                                      <group
                                        name="thigh_fkL_087"
                                        rotation={[-1.597, -0.183, -0.089]}
                                      >
                                        <group
                                          name="shin_fkL_088"
                                          position={[0, 0.835, 0]}
                                          rotation={[0.203, 0, 0]}
                                        >
                                          <group
                                            name="MCH-foot_fkL_089"
                                            position={[0, 1.267, 0]}
                                            rotation={[-1.401, -0.011, 0.212]}
                                          >
                                            <group name="foot_fkL_090">
                                              <group
                                                name="MCH-toe_fkL_091"
                                                position={[0, 0.417, 0]}
                                                rotation={[2.866, 0.001, -3.12]}
                                              >
                                                <group name="toe_fkL_092">
                                                  <group
                                                    name="toe_fkL_end_093"
                                                    position={[0, 0.188, 0]}
                                                  >
                                                    <group
                                                      name="toe_fkL_end_end_0583"
                                                      position={[0, 0.188, 0]}
                                                    />
                                                  </group>
                                                </group>
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-thigh_ik_swingL_094"
                                        rotation={[-1.474, -0.214, -0.066]}
                                      >
                                        <group
                                          name="thigh_ikL_095"
                                          rotation={[-0.123, 0.021, 0.003]}
                                        >
                                          <group
                                            name="MCH-shin_ikL_096"
                                            position={[0, 0.835, 0]}
                                            rotation={[0.203, 0, 0]}
                                          >
                                            <group
                                              name="MCH-shin_ikL_end_097"
                                              position={[0, 1.267, 0]}
                                            >
                                              <group
                                                name="MCH-shin_ikL_end_end_0584"
                                                position={[0, 1.267, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="MCH-thigh_tweakL_098"
                                      position={[0.287, 0.084, 0.168]}
                                      rotation={[2.707, -0.183, -0.089]}
                                    >
                                      <group name="thigh_tweakL_099">
                                        <group
                                          name="thigh_tweakL_end_0100"
                                          position={[0, 0.209, 0]}
                                        >
                                          <group
                                            name="thigh_tweakL_end_end_0585"
                                            position={[0, 0.209, 0]}
                                          />
                                        </group>
                                      </group>
                                    </group>
                                    <primitive
                                      object={nodes["DEF-thighL_0101"]}
                                    />
                                    <group
                                      name="thigh_parentR_0108"
                                      position={[-0.287, 0.084, 0.168]}
                                      rotation={[2.731, -0.088, 0.088]}
                                    >
                                      <group
                                        name="thigh_parentR_end_0109"
                                        position={[0, 0.209, 0]}
                                      >
                                        <group
                                          name="thigh_parentR_end_end_0587"
                                          position={[0, 0.209, 0]}
                                        />
                                      </group>
                                    </group>
                                    <group
                                      name="MCH-thigh_parentR_0110"
                                      position={[-0.287, 0.084, 0.168]}
                                      rotation={[-1.979, 0, 0]}
                                    >
                                      <group
                                        name="thigh_fkR_0111"
                                        rotation={[-1.597, 0.183, 0.089]}
                                      >
                                        <group
                                          name="shin_fkR_0112"
                                          position={[0, 0.835, 0]}
                                          rotation={[0.203, 0, 0]}
                                        >
                                          <group
                                            name="MCH-foot_fkR_0113"
                                            position={[0, 1.267, 0]}
                                            rotation={[-1.401, 0.011, -0.212]}
                                          >
                                            <group name="foot_fkR_0114">
                                              <group
                                                name="MCH-toe_fkR_0115"
                                                position={[0, 0.417, 0]}
                                                rotation={[2.866, -0.001, 3.12]}
                                              >
                                                <group name="toe_fkR_0116">
                                                  <group
                                                    name="toe_fkR_end_0117"
                                                    position={[0, 0.188, 0]}
                                                  >
                                                    <group
                                                      name="toe_fkR_end_end_0588"
                                                      position={[0, 0.188, 0]}
                                                    />
                                                  </group>
                                                </group>
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-thigh_ik_swingR_0118"
                                        rotation={[-1.475, 0.214, 0.073]}
                                      >
                                        <group
                                          name="thigh_ikR_0119"
                                          rotation={[-0.138, -0.021, -0.003]}
                                          scale={0.998}
                                        >
                                          <group
                                            name="MCH-shin_ikR_0120"
                                            position={[0, 0.835, 0]}
                                            rotation={[0.229, 0, 0]}
                                            scale={1.001}
                                          >
                                            <group
                                              name="MCH-shin_ikR_end_0121"
                                              position={[0, 1.267, 0]}
                                            >
                                              <group
                                                name="MCH-shin_ikR_end_end_0589"
                                                position={[0, 1.267, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="MCH-thigh_tweakR_0122"
                                      position={[-0.287, 0.084, 0.168]}
                                      rotation={[2.691, 0.181, 0.099]}
                                    >
                                      <group name="thigh_tweakR_0123">
                                        <group
                                          name="thigh_tweakR_end_0124"
                                          position={[0, 0.209, 0]}
                                        >
                                          <group
                                            name="thigh_tweakR_end_end_0590"
                                            position={[0, 0.209, 0]}
                                          />
                                        </group>
                                      </group>
                                    </group>
                                    <primitive
                                      object={nodes["DEF-thighR_0125"]}
                                    />
                                  </group>
                                </group>
                                <group
                                  name="tweak_spine001_0132"
                                  rotation={[-0.292, 0, 0]}
                                >
                                  <group name="ORG-spine001_0133">
                                    <group
                                      name="ORG-spine001_end_0134"
                                      position={[0, 0.192, 0]}
                                    >
                                      <group
                                        name="ORG-spine001_end_end_0592"
                                        position={[0, 0.192, 0]}
                                      />
                                    </group>
                                  </group>
                                </group>
                                <group
                                  name="MCH-WGT-hips_0135"
                                  position={[0, -0.526, 0]}
                                >
                                  <group
                                    name="MCH-WGT-hips_end_0136"
                                    position={[0, 0.526, 0]}
                                  >
                                    <group
                                      name="MCH-WGT-hips_end_end_0593"
                                      position={[0, 0.526, 0]}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                        <group
                          name="MCH-spine002_0137"
                          position={[0, -0.127, 0.432]}
                        >
                          <group
                            name="spine_fk002_0138"
                            rotation={[1.458, 0, 0]}
                          >
                            <group
                              name="MCH-pivot_0139"
                              rotation={[0.229, 0, 0]}
                            >
                              <group
                                name="tweak_spine002_0140"
                                rotation={[-0.229, 0, 0]}
                              >
                                <group name="ORG-spine002_0141">
                                  <group
                                    name="ORG-spine002_end_0142"
                                    position={[0, 0.334, 0]}
                                  >
                                    <group
                                      name="ORG-spine002_end_end_0594"
                                      position={[0, 0.334, 0]}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                            <group
                              name="MCH-spine003_0143"
                              position={[0, 0.334, 0]}
                              rotation={[-1.458, 0, 0]}
                            >
                              <group
                                name="spine_fk003_0144"
                                rotation={[1.374, 0, 0]}
                              >
                                <group
                                  name="ORG-spine004_0145"
                                  position={[0, 0.326, 0]}
                                  rotation={[0.384, 0, 0]}
                                >
                                  <group
                                    name="ORG-spine005_0146"
                                    position={[0, 0.158, 0]}
                                    rotation={[0.226, -0.012, 0]}
                                  >
                                    <group
                                      name="ORG-spine006_0147"
                                      position={[0, 0.068, 0]}
                                      rotation={[-0.407, -0.014, 0.006]}
                                    >
                                      <group
                                        name="ORG-spine006_end_0148"
                                        position={[0, 0.977, 0]}
                                      >
                                        <group
                                          name="ORG-spine006_end_end_0595"
                                          position={[0, 0.977, 0]}
                                        />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group
                                  name="MCH-ROT-neck_0149"
                                  position={[0, 0.326, 0]}
                                  rotation={[-1.374, 0, 0]}
                                >
                                  <group
                                    name="neck_0150"
                                    rotation={[1.826, 0, 0]}
                                  >
                                    <group
                                      name="MCH-ROT-head_0151"
                                      position={[0, 0.225, 0]}
                                      rotation={[-1.826, 0, 0]}
                                    >
                                      <group
                                        name="head_0152"
                                        rotation={[1.576, -0.025, 0.001]}
                                      >
                                        <group
                                          name="head_end_0153"
                                          position={[0, 0.977, 0]}
                                        >
                                          <group
                                            name="head_end_end_0596"
                                            position={[0, 0.977, 0]}
                                          />
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="tweak_spine004_0154"
                                      rotation={[-0.068, 0, 0]}
                                    >
                                      <group
                                        name="tweak_spine004_end_0155"
                                        position={[0, 0.079, 0]}
                                      >
                                        <group
                                          name="tweak_spine004_end_end_0597"
                                          position={[0, 0.079, 0]}
                                        />
                                      </group>
                                    </group>
                                    <group name="MCH-STR-neck_0156">
                                      <group
                                        name="MCH-spine005_0157"
                                        position={[0, 0.158, -0.011]}
                                        rotation={[0.003, -0.013, 0]}
                                      >
                                        <group
                                          name="tweak_spine005_0158"
                                          rotation={[0.158, 0, 0]}
                                        >
                                          <group
                                            name="tweak_spine005_end_0159"
                                            position={[0, 0.034, 0]}
                                          >
                                            <group
                                              name="tweak_spine005_end_end_0598"
                                              position={[0, 0.034, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="tweak_spine003_0160">
                                  <group name="ORG-spine003_0161">
                                    <group
                                      name="ORG-shoulderL_0162"
                                      position={[0.085, 0.223, 0.019]}
                                      rotation={[-1.399, 0.052, -1.284]}
                                    >
                                      <group
                                        name="ORG-upper_armL_0163"
                                        position={[0.047, 0.385, -0.073]}
                                        rotation={[1.93, -0.498, -3.035]}
                                        scale={0.999}
                                      >
                                        <group
                                          name="ORG-forearmL_0164"
                                          position={[0, 0.521, 0]}
                                          rotation={[0.145, 0, 0]}
                                        >
                                          <group
                                            name="ORG-handL_0165"
                                            position={[0, 0.744, 0]}
                                            rotation={[-0.701, -0.005, -0.231]}
                                          >
                                            <group name="MCH-hand_tweakL_0166">
                                              <group name="hand_tweakL_0167">
                                                <group
                                                  name="hand_tweakL_end_0168"
                                                  position={[0, 0.031, 0]}
                                                >
                                                  <group
                                                    name="hand_tweakL_end_end_0599"
                                                    position={[0, 0.031, 0]}
                                                  />
                                                </group>
                                              </group>
                                            </group>
                                          </group>
                                          <group name="MCH-forearm_tweakL_0169">
                                            <group name="forearm_tweakL_0170">
                                              <group
                                                name="forearm_tweakL_end_0171"
                                                position={[0, 0.186, 0]}
                                              >
                                                <group
                                                  name="forearm_tweakL_end_end_0600"
                                                  position={[0, 0.186, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                          <group
                                            name="MCH-forearm_tweakL001_0172"
                                            position={[0, 0.372, 0]}
                                            rotation={[0, -0.043, 0]}
                                          >
                                            <group
                                              name="forearm_tweakL001_0173"
                                              rotation={[0, 0.042, 0]}
                                            >
                                              <group
                                                name="forearm_tweakL001_end_0174"
                                                position={[0, 0.186, 0]}
                                              >
                                                <group
                                                  name="forearm_tweakL001_end_end_0581"
                                                  position={[0, 0.186, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-upper_arm_parent_widgetL_0175"
                                          scale={1.001}
                                        >
                                          <group
                                            name="MCH-upper_arm_parent_widgetL_end_0176"
                                            position={[0, 0.043, 0]}
                                          >
                                            <group
                                              name="MCH-upper_arm_parent_widgetL_end_end_0582"
                                              position={[0, 0.043, 0]}
                                            />
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-upper_arm_tweakL001_0177"
                                          position={[0, 0.261, 0]}
                                          scale={1.001}
                                        >
                                          <group name="upper_arm_tweakL001_0178">
                                            <group
                                              name="upper_arm_tweakL001_end_0179"
                                              position={[0, 0.13, 0]}
                                            >
                                              <group
                                                name="upper_arm_tweakL001_end_end_0603"
                                                position={[0, 0.13, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <primitive
                                        object={nodes["DEF-shoulderL_0180"]}
                                      />
                                      <group
                                        name="upper_arm_parentL_0182"
                                        position={[0.047, 0.385, -0.073]}
                                        rotation={[-1.399, -1.025, -0.154]}
                                      >
                                        <group
                                          name="upper_arm_parentL_end_0183"
                                          position={[0, 0.13, 0]}
                                        >
                                          <group
                                            name="upper_arm_parentL_end_end_0605"
                                            position={[0, 0.13, 0]}
                                          />
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-upper_arm_parentL_0184"
                                        position={[0.047, 0.385, -0.073]}
                                        rotation={[0.057, 0.01, 1.285]}
                                      >
                                        <group
                                          name="upper_arm_fkL_0185"
                                          rotation={[-2.429, -1.226, -0.871]}
                                        >
                                          <group
                                            name="forearm_fkL_0186"
                                            position={[0, 0.521, 0]}
                                            rotation={[0.138, 0, 0]}
                                          >
                                            <group
                                              name="MCH-hand_fkL_0187"
                                              position={[0, 0.744, 0]}
                                              rotation={[-0.709, 0, -0.232]}
                                            >
                                              <group name="hand_fkL_0188">
                                                <group
                                                  name="hand_fkL_end_0189"
                                                  position={[0, 0.124, 0]}
                                                >
                                                  <group
                                                    name="hand_fkL_end_end_0606"
                                                    position={[0, 0.124, 0]}
                                                  />
                                                </group>
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-upper_arm_ik_swingL_0190"
                                          rotation={[-2.483, -1.335, -0.916]}
                                        >
                                          <group
                                            name="upper_arm_ikL_0191"
                                            rotation={[-0.086, 0.08, 0.007]}
                                            scale={0.999}
                                          >
                                            <group
                                              name="MCH-forearm_ikL_0192"
                                              position={[0, 0.521, 0]}
                                              rotation={[0.145, 0, 0]}
                                            >
                                              <group
                                                name="MCH-forearm_ikL_end_0193"
                                                position={[0, 0.744, 0]}
                                              >
                                                <group
                                                  name="MCH-forearm_ikL_end_end_0607"
                                                  position={[0, 0.744, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-upper_arm_tweakL_0194"
                                        position={[0.047, 0.385, -0.073]}
                                        rotation={[1.93, -0.499, -3.035]}
                                      >
                                        <group name="upper_arm_tweakL_0195">
                                          <group
                                            name="upper_arm_tweakL_end_0196"
                                            position={[0, 0.13, 0]}
                                          >
                                            <group
                                              name="upper_arm_tweakL_end_end_0608"
                                              position={[0, 0.13, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                      <primitive
                                        object={nodes["DEF-upper_armL_0197"]}
                                      />
                                    </group>
                                    <group
                                      name="ORG-shoulderR_0331"
                                      position={[-0.085, 0.223, 0.019]}
                                      rotation={[-1.399, -0.052, 1.284]}
                                    >
                                      <group
                                        name="ORG-upper_armR_0332"
                                        position={[-0.047, 0.385, -0.073]}
                                        rotation={[1.988, 0.475, 2.999]}
                                        scale={0.994}
                                      >
                                        <group
                                          name="ORG-forearmR_0333"
                                          position={[0, 0.521, 0]}
                                          rotation={[0.21, 0, 0]}
                                          scale={1.002}
                                        >
                                          <group
                                            name="ORG-handR_0334"
                                            position={[0, 0.744, 0]}
                                            rotation={[-0.724, 0, 0.216]}
                                            scale={1.004}
                                          >
                                            <group name="MCH-hand_tweakR_0335">
                                              <group name="hand_tweakR_0336">
                                                <group
                                                  name="hand_tweakR_end_0337"
                                                  position={[0, 0.031, 0]}
                                                >
                                                  <group
                                                    name="hand_tweakR_end_end_0649"
                                                    position={[0, 0.031, 0]}
                                                  />
                                                </group>
                                              </group>
                                            </group>
                                          </group>
                                          <group
                                            name="MCH-forearm_tweakR_0338"
                                            scale={1.004}
                                          >
                                            <group name="forearm_tweakR_0339">
                                              <group
                                                name="forearm_tweakR_end_0340"
                                                position={[0, 0.186, 0]}
                                              >
                                                <group
                                                  name="forearm_tweakR_end_end_0650"
                                                  position={[0, 0.186, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                          <group
                                            name="MCH-forearm_tweakR001_0321"
                                            position={[0, 0.372, 0]}
                                            rotation={[0, 0.04, 0]}
                                            scale={1.004}
                                          >
                                            <group
                                              name="forearm_tweakR001_0342"
                                              rotation={[0, -0.042, 0]}
                                            >
                                              <group
                                                name="forearm_tweakR001_end_0343"
                                                position={[0, 0.186, 0]}
                                              >
                                                <group
                                                  name="forearm_tweakR001_end_end_0651"
                                                  position={[0, 0.186, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-upper_arm_parent_widgetR_0344"
                                          scale={1.006}
                                        >
                                          <group
                                            name="MCH-upper_arm_parent_widgetR_end_0345"
                                            position={[0, 0.043, 0]}
                                          >
                                            <group
                                              name="MCH-upper_arm_parent_widgetR_end_end_0652"
                                              position={[0, 0.043, 0]}
                                            />
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-upper_arm_tweakR001_0346"
                                          position={[0, 0.261, 0]}
                                          rotation={[0, -0.009, 0]}
                                          scale={1.006}
                                        >
                                          <group name="upper_arm_tweakR001_0347">
                                            <group
                                              name="upper_arm_tweakR001_end_0348"
                                              position={[0, 0.13, 0]}
                                            >
                                              <group
                                                name="upper_arm_tweakR001_end_end_0653"
                                                position={[0, 0.13, 0]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <primitive
                                        object={nodes["DEF-shoulderR_0349"]}
                                      />
                                      <group
                                        name="upper_arm_parentR_0351"
                                        position={[-0.047, 0.385, -0.073]}
                                        rotation={[-1.399, 1.025, 0.154]}
                                      >
                                        <group
                                          name="upper_arm_parentR_end_0352"
                                          position={[0, 0.13, 0]}
                                        >
                                          <group
                                            name="upper_arm_parentR_end_end_0655"
                                            position={[0, 0.13, 0]}
                                          />
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-upper_arm_parentR_0353"
                                        position={[-0.047, 0.385, -0.073]}
                                        rotation={[0.057, -0.01, -1.285]}
                                      >
                                        <group
                                          name="upper_arm_fkR_0354"
                                          rotation={[-2.429, 1.226, 0.871]}
                                        >
                                          <group
                                            name="forearm_fkR_0355"
                                            position={[0, 0.521, 0]}
                                            rotation={[0.138, 0, 0]}
                                          >
                                            <group
                                              name="MCH-hand_fkR_0356"
                                              position={[0, 0.744, 0]}
                                              rotation={[-0.709, 0, 0.232]}
                                            >
                                              <group name="hand_fkR_0357">
                                                <group
                                                  name="hand_fkR_end_0358"
                                                  position={[0, 0.124, 0]}
                                                >
                                                  <group
                                                    name="hand_fkR_end_end_0656"
                                                    position={[0, 0.124, 0]}
                                                  />
                                                </group>
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                        <group
                                          name="MCH-upper_arm_ik_swingR_0359"
                                          rotation={[-2.52, 1.323, 0.94]}
                                        >
                                          <group
                                            name="upper_arm_ikR_0360"
                                            rotation={[-0.124, -0.064, -0.008]}
                                            scale={0.994}
                                          >
                                            <group
                                              name="MCH-forearm_ikR_0341"
                                              position={[0, 0.521, 0]}
                                              rotation={[0.21, 0, 0]}
                                              scale={1.002}
                                            >
                                              <group
                                                name="MCH-forearm_ikR_end_0362"
                                                position={[0, 0.744, 0]}
                                              >
                                                <group
                                                  name="MCH-forearm_ikR_end_end_0657"
                                                  position={[0, 0.744, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                      <group
                                        name="MCH-upper_arm_tweakR_0363"
                                        position={[-0.047, 0.385, -0.073]}
                                        rotation={[1.991, 0.493, 2.997]}
                                      >
                                        <group name="upper_arm_tweakR_0364">
                                          <group
                                            name="upper_arm_tweakR_end_0365"
                                            position={[0, 0.13, 0]}
                                          >
                                            <group
                                              name="upper_arm_tweakR_end_end_0658"
                                              position={[0, 0.13, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                      <primitive
                                        object={nodes["DEF-upper_armR_0366"]}
                                      />
                                    </group>
                                    <group
                                      name="shoulderL_0504"
                                      position={[0.085, 0.223, 0.019]}
                                      rotation={[-1.399, 0.052, -1.284]}
                                    >
                                      <group
                                        name="shoulderL_end_0505"
                                        position={[0, 0.344, 0]}
                                      >
                                        <group
                                          name="shoulderL_end_end_0699"
                                          position={[0, 0.344, 0]}
                                        />
                                      </group>
                                    </group>
                                    <group
                                      name="shoulderR_0506"
                                      position={[-0.085, 0.223, 0.019]}
                                      rotation={[-1.399, -0.052, 1.284]}
                                    >
                                      <group
                                        name="shoulderR_end_0507"
                                        position={[0, 0.344, 0]}
                                      >
                                        <group
                                          name="shoulderR_end_end_0700"
                                          position={[0, 0.344, 0]}
                                        />
                                      </group>
                                    </group>
                                  </group>
                                </group>
                                <group name="MCH-WGT-chest_0508">
                                  <group
                                    name="MCH-WGT-chest_end_0509"
                                    position={[0, 0.326, 0]}
                                  >
                                    <group
                                      name="MCH-WGT-chest_end_end_0681"
                                      position={[0, 0.326, 0]}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-hand_ikparentL_0510"
                      position={[0.692, 0.023, -0.182]}
                    >
                      <group
                        name="hand_ikL_0511"
                        position={[0.005, -0.015, 0.002]}
                        rotation={[-2.918, -0.718, -1.51]}
                      >
                        <group name="MCH-upper_arm_ik_targetL_0512">
                          <group
                            name="MCH-upper_arm_ik_targetL_end_0513"
                            position={[0, 0.124, 0]}
                          >
                            <group
                              name="MCH-upper_arm_ik_targetL_end_end_0682"
                              position={[0, 0.124, 0]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-upper_arm_ik_targetparentL_0514"
                      position={[1.81, -0.267, 0.778]}
                    >
                      <group
                        name="upper_arm_ik_targetL_0515"
                        rotation={[-0.179, -0.139, 1.319]}
                      >
                        <group
                          name="upper_arm_ik_targetL_end_0516"
                          position={[0, 0.158, 0]}
                        >
                          <group
                            name="upper_arm_ik_targetL_end_end_0701"
                            position={[0, 0.158, 0]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-hand_ikparentR_0517"
                      position={[-0.692, 0.023, -0.182]}
                    >
                      <group
                        name="hand_ikR_0518"
                        position={[-0.02, -0.032, 0.014]}
                        rotation={[-2.941, 0.711, 1.511]}
                      >
                        <group name="MCH-upper_arm_ik_targetR_0519">
                          <group
                            name="MCH-upper_arm_ik_targetR_end_0501"
                            position={[0, 0.124, 0]}
                          >
                            <group
                              name="MCH-upper_arm_ik_targetR_end_end_0702"
                              position={[0, 0.124, 0]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-upper_arm_ik_targetparentR_0521"
                      position={[-1.81, -0.267, 0.778]}
                    >
                      <group
                        name="upper_arm_ik_targetR_0522"
                        rotation={[-0.179, 0.139, -1.319]}
                      >
                        <group
                          name="upper_arm_ik_targetR_end_0523"
                          position={[0, 0.158, 0]}
                        >
                          <group
                            name="upper_arm_ik_targetR_end_end_0703"
                            position={[0, 0.158, 0]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-foot_ikparentL_0524"
                      position={[0.422, 0.173, -2.137]}
                    >
                      <group name="foot_ikL_0525">
                        <group
                          name="foot_spin_ikL_0526"
                          position={[-0.004, -0.391, -0.145]}
                        >
                          <group
                            name="foot_heel_ikL_0527"
                            position={[0.004, 0.391, 0.145]}
                          >
                            <group
                              name="foot_heel_ikL_end_0528"
                              position={[0, 0.209, 0]}
                            >
                              <group
                                name="foot_heel_ikL_end_end_0704"
                                position={[0, 0.209, 0]}
                              />
                            </group>
                          </group>
                          <group
                            name="MCH-heel02_rock2L_0529"
                            position={[-0.226, 0.22, -0.022]}
                          >
                            <group
                              name="MCH-heel02_rock1L_0530"
                              position={[0.44, 0, 0]}
                            >
                              <group
                                name="MCH-heel02_roll2L_0531"
                                position={[-0.22, 0, 0]}
                              >
                                <group
                                  name="MCH-heel02_roll1L_0532"
                                  position={[0.006, -0.22, 0.022]}
                                >
                                  <group
                                    name="MCH-foot_rollL_0533"
                                    position={[0.004, 0.391, 0.145]}
                                    rotation={[-2.786, 0.004, 0.009]}
                                  >
                                    <group name="MCH-thigh_ik_targetL_0534">
                                      <group
                                        name="MCH-toe_ik_parentL_0535"
                                        position={[0, 0.417, 0]}
                                        rotation={[2.786, 0, 0.01]}
                                      >
                                        <group
                                          name="toe_ikL_0536"
                                          rotation={[0.08, 0, -3.13]}
                                        >
                                          <group
                                            name="toe_ikL_end_0537"
                                            position={[0, 0.188, 0]}
                                          >
                                            <group
                                              name="toe_ikL_end_end_0705"
                                              position={[0, 0.188, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-thigh_ik_targetparentL_0538"
                      position={[0.76, -2.109, -1.098]}
                    >
                      <group
                        name="thigh_ik_targetL_0539"
                        rotation={[0.097, 0.009, 0.192]}
                      >
                        <group
                          name="thigh_ik_targetL_end_0520"
                          position={[0, 0.261, 0]}
                        >
                          <group
                            name="thigh_ik_targetL_end_end_0706"
                            position={[0, 0.261, 0]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-foot_ikparentR_0541"
                      position={[-0.422, 0.173, -2.137]}
                    >
                      <group
                        name="foot_ikR_0542"
                        position={[-0.014, 0, 0.007]}
                        rotation={[-0.011, 0, 0]}
                      >
                        <group
                          name="foot_spin_ikR_0543"
                          position={[0.004, -0.391, -0.145]}
                        >
                          <group
                            name="foot_heel_ikR_0544"
                            position={[-0.004, 0.391, 0.145]}
                          >
                            <group
                              name="foot_heel_ikR_end_0545"
                              position={[0, 0.209, 0]}
                            >
                              <group
                                name="foot_heel_ikR_end_end_0707"
                                position={[0, 0.209, 0]}
                              />
                            </group>
                          </group>
                          <group
                            name="MCH-heel02_rock2R_0546"
                            position={[0.226, 0.22, -0.022]}
                          >
                            <group
                              name="MCH-heel02_rock1R_0547"
                              position={[-0.44, 0, 0]}
                            >
                              <group
                                name="MCH-heel02_roll2R_0548"
                                position={[0.22, 0, 0]}
                              >
                                <group
                                  name="MCH-heel02_roll1R_0549"
                                  position={[-0.006, -0.22, 0.022]}
                                >
                                  <group
                                    name="MCH-foot_rollR_0550"
                                    position={[-0.004, 0.391, 0.145]}
                                    rotation={[-2.786, -0.004, -0.009]}
                                  >
                                    <group name="MCH-thigh_ik_targetR_0551">
                                      <group
                                        name="MCH-toe_ik_parentR_0552"
                                        position={[0, 0.417, 0]}
                                        rotation={[2.786, 0, -0.01]}
                                      >
                                        <group
                                          name="toe_ikR_0553"
                                          rotation={[0.08, 0, 3.13]}
                                        >
                                          <group
                                            name="toe_ikR_end_0554"
                                            position={[0, 0.188, 0]}
                                          >
                                            <group
                                              name="toe_ikR_end_end_0708"
                                              position={[0, 0.188, 0]}
                                            />
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                    <group
                      name="MCH-thigh_ik_targetparentR_0555"
                      position={[-0.76, -2.109, -1.098]}
                    >
                      <group
                        name="thigh_ik_targetR_0556"
                        rotation={[0.097, -0.009, -0.192]}
                      >
                        <group
                          name="thigh_ik_targetR_end_0557"
                          position={[0, 0.261, 0]}
                        >
                          <group
                            name="thigh_ik_targetR_end_end_0709"
                            position={[0, 0.261, 0]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="Object_716"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="Plane"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
              </group>
            </group>
          </group>
          <skinnedMesh
            name="Object_717"
            geometry={nodes.Object_717.geometry}
            material={materials.ArmorOut}
            skeleton={nodes.Object_717.skeleton}
          />
          <skinnedMesh
            name="Object_718"
            geometry={nodes.Object_718.geometry}
            material={materials.Body}
            skeleton={nodes.Object_718.skeleton}
          />
          <skinnedMesh
            name="Object_719"
            geometry={nodes.Object_719.geometry}
            material={materials.ArmorIn}
            skeleton={nodes.Object_719.skeleton}
          />
          <skinnedMesh
            name="Object_720"
            geometry={nodes.Object_720.geometry}
            material={materials.Decor}
            skeleton={nodes.Object_720.skeleton}
          />
          <skinnedMesh
            name="Object_721"
            geometry={nodes.Object_721.geometry}
            material={materials.Lights}
            skeleton={nodes.Object_721.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/somerobot.glb");
