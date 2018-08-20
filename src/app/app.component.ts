import {
  Component
} from '@angular/core';
import * as Matter from 'matter-js';
import * as MatterAttractors from 'matter-attractors';
import * as PIXI from 'pixi.js/dist/pixi.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor() {
    // Matter.js module aliases
    var Engine = Matter.Engine,
      Events = Matter.Events,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      Common = Matter.Common,
      Bodies = Matter.Bodies;
    Matter.use(MatterAttractors);

    // create engine
    var engine = Engine.create();

    // create renderer
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: Math.min(document.documentElement.clientWidth, 1024),
        height: Math.min(document.documentElement.clientHeight, 1024),
        wireframes: false
      }
    });

    // create runner
    var runner = Runner.create();

    Runner.run(runner, engine);
    Render.run(render);

    // create demo scene
    var world = engine.world;
    world.gravity.scale = 0;

    // create a body with an attractor
    var attractiveBody = Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      0,
      {
        isStatic: true,

        // example of an attractor function that
        // returns a force vector that applies to bodyB
        plugin: {
          attractors: [
            function (bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            }
          ]
        }
      });

    World.add(world, attractiveBody);

    console.log(PIXI);

    // add some bodies that to be attracted
    for (var i = 0; i < 200; i += 1) {
      var body = Bodies.circle(
        render.options.width / 2,
        render.options.height / 2,
        Common.random(4, 10)
      );

      World.add(world, body);
    }

    // // add mouse control
    // var mouse = Mouse.create(render.canvas);

    // Events.on(engine, 'afterUpdate', function () {
    //   if (!mouse.position.x) {
    //     return;
    //   }

    //   // smoothly move the attractor body towards the mouse
    //   Body.translate(attractiveBody, {
    //     x: (mouse.position.x - attractiveBody.position.x) * 0.25,
    //     y: (mouse.position.y - attractiveBody.position.y) * 0.25
    //   });
    // });


    // console.log(Body);

    // run the engine
    Engine.run(engine);
  }
}
