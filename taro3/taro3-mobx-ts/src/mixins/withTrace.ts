/*
 * @Author: zlb
 * @Date: 2021-03-05 10:49:37
 * @Description: file content
 */

import { tracksTime } from '../utils/common';

function withTrace(options?: any) {
  const { cname, group, eachTime = false } = options || {};
  return function traceComponent(WrappedComponent: any): any {
    class WithTrace extends WrappedComponent {
      componentWillMount() {
        console.log(this, 'this-------');
        try {
          if (cname) {
            this.dirName = cname;
          } else {
            if (!this.props.tid) return;
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
        if (eachTime) {
          tracksTime({
            key: `${this.dirName}_componentDidUpdate`,
            group: `${group || this.dirName}_render`,
            down: true,
          });
        }
        if (super.componentDidUpdate) {
          super.componentDidUpdate();
        }
      }

      render() {
        if (eachTime) {
          tracksTime({
            key: `${this.dirName}_render`,
            group: `${group || this.dirName}_render`,
            print: true,
          });
        }
        return super.render();
      }
    }

    return WithTrace;
  };
}

export default withTrace;
