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
      Dom: {
        render: render,
        element: document.querySelector('#player')
      }
    });
    World.add(world, player);

    var item = DomBodies.block(200, 200, {
      Dom: {
        render: render,
        element: document.querySelector('.item')
      }
    });
    World.add(world, item);



    

    player.onCollide(function(pair) {
        console.log('BoxB got hit!', pair);
            //pair.bodyA.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            //pair.bodyB.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    });


      
    const keyHandlers = {
      KeyD: () => {
        Matter.Body.applyForce(game, {
          x: player.position.x,
          y: player.position.y
        }, {x: 0.0000002, y: 0});

        
        $("#game").css('left', -player.position.x);
          
      },
      KeyA: () => {
        Matter.Body.applyForce(player, {
          x: player.position.x,
          y: player.position.y
        }, {x: -0.0000002, y: 0});

        $("#game").css('left', player.position.x);
      },
      KeyS: () => {
        Matter.Body.applyForce(player, {
          x: player.position.x,
          y: player.position.y
        }, {x:0, y: 0.0000002})
      },
      KeyW: () => {
        Matter.Body.applyForce(player, {
          x: player.position.x,
          y: player.position.y
        }, {x:0, y: -0.0000002})
      },
    };

    const keysDown = new Set();
    document.addEventListener("keydown", event => {
      keysDown.add(event.code);
    });
    document.addEventListener("keyup", event => {
      keysDown.delete(event.code);
    });


    Matter.Events.on(engine, "beforeUpdate", event => {
      [...keysDown].forEach(k => {
        keyHandlers[k]?.();
      });
    });








/*
    // Listener per rilevare le collisioni
    Matter.Events.on(engine, 'collisionStart', function(event) {
      const pairs = event.pairs;

      // Controlla le coppie di oggetti in collisione
      pairs.forEach(function(pair) {
        console.log(pair);
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        // Verifica se player e item hanno colliso
        if ((bodyA === player && bodyB === item) || (bodyA === item && bodyB === player)) {
            console.log('Collisione tra player e item!');
            // Aggiungi la logica per raccogliere l'item qui
        }
      });
    });*/
})();