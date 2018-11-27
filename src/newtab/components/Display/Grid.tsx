import * as React from 'react'
import './Grid.scss'

interface IProps {
  testString: string
}
export class Grid extends React.Component<IProps, {}> {
  render() {
    return (
      <div className="container">
        <div className="title">
          <h1>{this.props.testString}</h1>
        </div>
        <div className="text">
          <>
            <h2>
              Built with webpack, babel, typescript, react, redux and sass.
            </h2>
            <h2>
              Development server using express, webpack-dev-middleware and
              webpack-hot-middleware.
            </h2>
            <h2>Style-checking with prettier, tslint and sass-lint.</h2>
            <h2>Tested with jest and enzyme.</h2>
          </>
        </div>
      </div>
    )
  }
}