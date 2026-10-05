class Joueur {
  String pseudo;
  int force;
  int sante;

  Joueur(this.pseudo, this.force, this.sante);

  int afficherJoueur() {
      print('Pseudo: $pseudo');
      print('Force: $force');
      print('Santé: $sante%');
    return sante;
  }
}