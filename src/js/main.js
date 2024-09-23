(function(){
    Matter.use('matter-collision-events');
    Matter.use('matter-dom-plugin');
    //console.log(Matter);
    var Engine = Matter.Engine;
    var Runner = Matter.Runner;
    var RenderDom = Matter.RenderDom;
    var Body = Matter.Body;
    var DomBodies = Matter.DomBodies;
    var MouseConstraint = Matter.MouseConstraint;
    var DomMouseConstraint = Matter.DomMouseConstraint;
    var Mouse = Matter.Mouse;
    var Events = Matter.Events;
    var World = Matter.World;
    var Vector = Matter.Vector;
    var Vertices = Matter.Vertices;
    var Bounds = Matter.Bounds;

    var engine = Engine.create();
    var world = engine.world;
    var runner = Runner.create();
    Runner.run(runner, engine);

    
    var render = RenderDom.create({
        engine: engine
    });
    RenderDom.run(render);

    var worldWidth = render.mapping.WORLD.width;
    var worldHeight = render.mapping.WORLD.height;
    var worldCenter = render.mapping.WORLD.center;
    var viewHeight = render.mapping.VIEW.height;
    var viewWidth = render.mapping.VIEW.width;
    var viewCenter = render.mapping.VIEW.center;


    engine.gravity.y = 0;
    
    /*var player = DomBodies.block(0, 0, {
      frictionAir: 0.8,
      Dom: {
        render: render,
        element: document.querySelector('#player')
      },
    });*/

    var player = DomBodies.create({
      Dom: {
          render: render,
          element: document.querySelector('#player')
      },
      el: '#player',
      render: render,
      position: {x: 0, y: 0},
      bodyType: 'circle',
      restitution: 0.9,
      friction: 0.2,
      frictionStatic: 0.0,
      frictionAir: 1
  });


    World.add(world, player);






    player.onCollide(function(pair) {
      console.log(pair.bodyB);
    });

    /*var item = DomBodies.block(100, 100, {
      frictionAir: 0.8,
      Dom: {
        render: render,
        element: document.querySelector('.item')
      }
    });*/

    

    var item = DomBodies.create({
      Dom: {
          render: render,
          element: document.querySelector('.item')
      },
      el: '.item',
      render: render,
      position: {x: 100, y: 100},
      bodyType: 'circle',
      restitution: 0.9,
      friction: 0.2,
      frictionStatic: 0.0,
      frictionAir: 1
  });

    World.add(world, item);

    const keyHandlers = {
      KeyD: () => {
        Matter.Body.applyForce(player, player.position, { x: +0.00001, y: 0 });
      },
      KeyA: () => {
        Matter.Body.applyForce(player, player.position, { x: -0.00001, y: 0 });
      },
      KeyS: () => {
        Matter.Body.applyForce(player, player.position, { x: 0, y: +0.00001 });
      },
      KeyW: () => {
        Matter.Body.applyForce(player, player.position, { x: 0, y: -0.00001 });
      },
    };

    const keysDown = new Set();
    document.addEventListener("keydown", event => keysDown.add(event.code));
    document.addEventListener("keyup", event => keysDown.delete(event.code));

    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => keyHandlers[k]?.());
      const { x, y } = player.position;
      //position: absolute; transform: translate(76.6667px, -15px) rotate(0rad);
      let translate = $("#player").attr('style').toString().split(' rotate')[0].replace('position: absolute; transform: translate(','').replace('px)','').split('px, '); 
      //console.log(translate);
      
      $("#game").attr('style','transform: translate('+(translate[0] * -1)+'px, '+(translate[1] * -1)+'px)');
      //$("#game").css({ left: `${x}px`, top: `${y}px` });
      //$(".item").css({ left: `${(item.position.x * -1)}px`, top: `${(item.position.y * -1)}px` });
      updateLine();
      //console.log(item.position);
      
    });
    


    /*Matter.Events.on(engine, 'collisionStart', function(event) {
      event.pairs.forEach(function(pair) {
        console.log(pair);
      });
    });*/


})();