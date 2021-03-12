/*
 * @Author: zlb
 * @Date: 2021-03-05 10:49:37
 * @Description: file content
 */

import { tracksTime } from '../utils/common';

function withTrace(options: any) {
  const { cname, group } = options || {};
  return function traceComponent(WrappedComponent: any) {
    class WithTrace extends WrappedComponent {
      componentWillMount() {
        console.log(this, 'this-------');
        try {
          if (cname) {
            this.dirName = cname;
          } else {
            console.log(this.props.tid, 'this.props.$tid');
            const [preone, lastname] = this.props.tid
              .split('?')[0]
              .split('/')
              .slice(-2);
            if (lastname == 'index') {
              this.dirName = preone;
            } else {
              this.dirName = lastname;
            }
          }
          tracksTime({
            key: `${this.dirName}_componentWillMount`,
            group: group || this.dirName,
            print: true,
          });
        } catch (e) {
          console.log(e);
        }
        if (super.componentWillMount) {
          super.componentWillMount();
        }
      }

      componentDidMount() {
        tracksTime({
          key: `${this.dirName}_componentWillMount`,
          group: group || this.dirName,
          print: true,
        });
        if (super.componentDidMount) {
          super.componentDidMount();
        }
      }

      componentDidUpdate() {
        tracksTime({
          key: `${this.dirName}_componentDidUpdate`,
          group: group || this.dirName,
          print: true,
        });
        if (super.componentDidUpdate) {
          super.componentDidUpdate();
        }
      }
    }

    return WithTrace;
  };
}

export default withTrace;
