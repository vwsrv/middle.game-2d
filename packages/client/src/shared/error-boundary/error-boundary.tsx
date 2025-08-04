import { Component, PropsWithChildren, ErrorInfo } from 'react';
import { notification } from 'antd';
import i18n from '@/shared/i18n/i18n';

export type ErrorBoundaryProps = PropsWithChildren;
export type ErrorBoundaryState = object;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
  }

  static getDerivedStateFromError() {
    return null;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary:');
    console.error('Error:', error);

    if (errorInfo.componentStack) {
      console.error('ErrorInfo:', errorInfo.componentStack);
    }

    const description: string = error.message;

    notification.error({
      message: i18n.t('error.common.title'),
      description,
    });

    return null;
  }

  render() {
    return <>{this.props?.children}</>;
  }
}
export default ErrorBoundary;
