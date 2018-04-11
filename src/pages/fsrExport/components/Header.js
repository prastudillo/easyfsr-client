import React, { Component } from 'react';

const styles = {
  header: {
    marginBottom: '1em',
  },
};

class Header extends Component {
  render() {
    const { meta, user } = this.props;

    return (
      <div style={styles.header}>
        <div className="form-float">Form 67 (Revised October 25, 2013)</div>
        <div className="center" style={{ marginBottom: '1em' }}>
          <header className="bold">FACULTY SERVICE RECORD</header>
          <div>
            {meta.semester} Semester {meta.acadYear}
          </div>
        </div>
        <div className="grid">
          <div className="flex-mid" style={{ width: '75%' }}>
            <label>PRINTED NAME:</label>
            <div className="field-line" data-label="(Family)">
              {user.lastName}
            </div>
            <div className="field-line" data-label="(Given)">
              {user.firstName}
            </div>
            <div className="field-line" data-label="(MI)">
              {user.middleName
                .split(' ')
                .map(word => word[0])
                .join('.')}
            </div>
          </div>
          <div className="flex-mid margin1 left" style={{ width: '25%' }}>
            <label>RANK:</label>
            <div className="field-line">{user.rank}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;