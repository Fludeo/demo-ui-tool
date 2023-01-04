import { useEffect, useState } from 'react';

const useTournaments = (id) => {
  const [tournaments, setTournaments] = useState({ tournaments: [], count: 0 });

  useEffect(() => {
    if (id) {
      fetch(`/tournaments/${id}`, { mode: 'no-cors' })
        .then((res) => res.json())
        .then((res) => setTournaments(res))
        .catch((err) => console.log(err));
    } else {
      fetch('/tournaments', { mode: 'no-cors' })
        .then((res) => res.json())
        .then((res) => setTournaments(res))
        .catch((err) => console.log(err));
    }
  }, [tournaments]);

  return tournaments;
};

export default useTournaments;
