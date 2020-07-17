/*
 * 모든 모듈을 합쳐주는 webpack
 * 웹팩 설정파일
*/
//require ==> import 라고 생각 'path' 라이브러리 사용
const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'wordrelay-settting',
    mode: 'development', //development는 개발환경, 실서비스면 production
    devtool: 'eval',     //eval ==> 빠르게 로딩
    resolve:{//entry에서 확장자를 생략하기 위해 나올수 있는 확장자를 써준다
        extensions:['.js', '.jsx']
    },

    entry:{//두개의 파일을 합쳐서 만들어 주겠다.
        app: ['./client']
    },//입력
    module: { //entry에 있는 파일을 읽어서 모듈을 적용한뒤에 output에 뺀다
        rules:[{
            test: /\.jsx?/, //js와 jsx 파일에만 rule을 적용하겠다,          js에서 정규표현식쓸때 //로 감싸줌
            loader: 'babel-loader', //로더로 babel-loader를 적용
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    'react-hot-loader/babel',
                ],
            }
        }],
    },
    output:{//path.join ==> 경로를 합쳐주는 메서드,  __dirname 이게 현재폴더
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },//출력
}