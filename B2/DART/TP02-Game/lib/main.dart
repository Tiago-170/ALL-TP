import 'dart:io';
import 'Bot.dart';
import 'Joueur.dart';

void main() {
  Bot bot = Bot(1, 100);
  
  stdout.write('Quel est votre pseudo ? ');
  String pseudo = stdin.readLineSync()!;

  Joueur joueur = Joueur(pseudo, 1, 100);

  int tour = 1;

  while (bot.sante > 0 && joueur.sante > 0) {
    print('${joueur.pseudo}, appuyez sur entrée pour lancer les dés');
    stdin.readLineSync();

    int degatsJoueur = lancerDes(joueur.pseudo);

    print('${joueur.pseudo} assène un coup sur le bot avec une force de $degatsJoueur');

    bot.sante -= degatsJoueur;

    if (bot.sante < 0) {
      bot.sante = 0;
    }

    if (bot.sante == 0) {
      break;
    }

    print('Bot - Santé ${bot.sante}%');

    int degatsBot = lancerDes('bot');

    print('Le bot assène un coup à ${joueur.pseudo} avec une force de $degatsBot');

    joueur.sante -= degatsBot;

    if (joueur.sante < 0) {
      joueur.sante = 0;
    }

    print('${joueur.pseudo} - Santé ${joueur.sante}%');

    print('Fin du tour $tour');

    tour++;
  }

  if (bot.sante <= 0) {
    print('Vous avez gagné la partie !');
  }
  else {
    print('Le bot a gagné la partie !');
  }
  
}