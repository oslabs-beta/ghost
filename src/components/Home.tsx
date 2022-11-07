import * as React from 'react';

const Home = () => {
  
  return (
    <div className="bg-[#d6d4d4] dark:bg-[#191919] dark:text-gray-100 p-5 m-2 flex flex-col items-center align-middle">
      <div className='text-gray-900 dark:text-gray-100 text-2xl mt-20 mb-20'>
        Let's get started! View your Lambda functions on the left.
      </div>
      <div>
        <img className='animate-[wiggle_2s_ease-in-out_infinite] invisible dark:visible' src="https://i.postimg.cc/gcKrtv1H/ghost.png" />
      </div>
    </div>
  )
}

// @keyframes bounce-ghost{
//   from { transform: translate3d(0, 0, 0);}
//   to { transform: translate3d(0, 200px, 0);}
// }

/*

      _.---,._,'
       /' _.--.<
         /'     `'
       /' _.---._____
       \.'   ___, .-'`
           /'    \\             .
         /'       `-.          -|-
        |                       |
        |                   ..-'~~~`-..
        |                 .'           '.
        |                 |   R  I  P   |
  jgs   |                 |R A W D O G S|
        |                 |     < 3     |
         \              \\|             |//
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

*/

export default Home;