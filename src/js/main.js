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
    
    var player = DomBodies.block(100, 100, {
      frictionAir: 0.1,
      //position: { x: -$("#player").offset().left, y: -$("#player").offset().top },
      Dom: {
        render: render,
        element: document.querySelector('#player')
      }
    });
    World.add(world, player);
    player.onCollide(function(pair) {
      console.log(pair.bodyB);
    });

    var item = DomBodies.block(10, 10, {
      frictionAir: 0.1,
      Dom: {
        render: render,
        element: document.querySelector('.item')
      }
    });
    World.add(world, item);

    var game = DomBodies.block(10, 10, {
      frictionAir: 0.1,
      collisionFilter: { category: 0x0001, mask: 0x0000 },
      Dom: {
        render: render,
        element: document.querySelector('#game')
      }
    });
    World.add(world, game);

    const keyHandlers = {
      KeyD: () => {
        Matter.Body.applyForce(game, game.position, { x: -0.0000002, y: 0 });
        Matter.Body.applyForce(player, player.position, { x: -0.0000002, y: 0 });
        updateLine();
      },
      KeyA: () => {
        Matter.Body.applyForce(game, game.position, { x: +0.0000002, y: 0 });
        Matter.Body.applyForce(player, player.position, { x: +0.0000002, y: 0 });
        updateLine();
      },
      KeyS: () => {
        Matter.Body.applyForce(game, game.position, { x: 0, y: -0.0000002 });
        Matter.Body.applyForce(player, player.position, { x: 0, y: -0.0000002 });
        updateLine();
      },
      KeyW: () => {
        Matter.Body.applyForce(game, game.position, { x: 0, y: +0.0000002 });
        Matter.Body.applyForce(player, player.position, { x: 0, y: +0.0000002 });
        updateLine();
      },
    };

    const keysDown = new Set();
    document.addEventListener("keydown", event => keysDown.add(event.code));
    document.addEventListener("keyup", event => keysDown.delete(event.code));

    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => keyHandlers[k]?.());
      const { x, y } = game.position;
      $("#game").css({ left: `${x}px`, top: `${y}px` });
    });


    /*Matter.Events.on(engine, 'collisionStart', function(event) {
      event.pairs.forEach(function(pair) {
        console.log(pair);
      });
    });*/


})();