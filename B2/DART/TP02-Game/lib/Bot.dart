import 'dart:math';

class Bot {
  int force;
  int sante;

  Bot(this.force, this.sante);
}

int lancerDes(String nomJoueur) {
  Random random = Random();

  int de1 = random.nextInt(6) + 1;
  int de2 = random.nextInt(6) + 1;

  int resultat = de1 + de2;

  print('$nomJoueur a lancé les dés et a obtenu $resultat');

  return resultat;
}