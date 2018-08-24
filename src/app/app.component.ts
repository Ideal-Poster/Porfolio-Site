import {
  Component
} from '@angular/core';
import * as MatterAttractors from 'matter-attractors';
import * as PIXI from 'pixi.js/dist/pixi.js';
import * as Matter from 'matter-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    setTimeout(() => {
      // https://codepen.io/BakerCo/pen/ojKJJb?editors=0010

      // Matter.js module aliases
      var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies;

      // Create a Matter.js engine
      var engine = Engine.create();

      var renderer = new PIXI.WebGLRenderer(1000, 500, {
        antialias: true,
        resolution: 2
      });
      // renderer.roundPixels = false;

      renderer.backgroundColor = 0x000000;
      var stage = new PIXI.Container();
      document.body.appendChild(renderer.view);

      var bodies = [];
      var objects = [];

      function SpriteObject(shape, x, y, w, h, color) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.lineStyle(1, 0xFFFFFF);
        if (shape === 'rect') {
          graphics.drawRect(0, 0, w, h);
        } else if (shape === 'circle') {
          graphics.drawCircle(0, 0, w);
        }
        var texture = graphics.generateCanvasTexture();
        var sprite = new PIXI.Sprite(texture);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.position.x = x;
        sprite.position.y = y;
        stage.addChild(sprite);
        return sprite;
      }

      function BodyObject(shape, x, y, w, h) {
        if (shape === 'rect') {
          var body = Bodies.rectangle(x, y, w, h);
        } else if (shape === 'circle') {
          var body = Bodies.circle(x, y, w);
        }
        bodies.push(body);
        return body;
      }

      var createObject = function (shape, x, y, w, h, color) {
        return ({
          sprite: SpriteObject(shape, x * 2, y * 2, w * 2, h * 2, color),
          body: BodyObject(shape, x, y, w, h)
        });
      }

      for (var i = 0; i < 3; i++) {
        objects.push(createObject('circle', 200, 40 + i * 50, 10, 40, 0x55CC33));
      }

      var ground = createObject('rect', 250, 250, 500, 20, 0x111111);
      ground.body.isStatic = true;
      objects.push(ground);

      animate();

      function animate() {
        requestAnimationFrame(animate);

        objects.forEach(function (object) {
          object.sprite.position.x = object.body.position.x * 2;
          object.sprite.position.y = object.body.position.y * 2;
          object.sprite.rotation = object.body.angle;
        });
        renderer.render(stage);
      }

      World.add(engine.world, bodies);
      Engine.run(engine);

    }, 1000);
  }
}
