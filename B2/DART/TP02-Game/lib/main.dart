import 'dart:io';
import 'Bot.dart';
import 'Joueur.dart';
import 'dart:math';

int lancerDes(String nomJoueur) {
  Random random = Random();

  int de1 = random.nextInt(6) + 1;
  int de2 = random.nextInt(6) + 1;

  int resultat = de1 + de2;

  print('$nomJoueur a lancé les dés et a obtenu $resultat');

  return resultat;
}

void main() {
  Bot bot = Bot(1, 100);
  
  stdout.write('Quel est votre pseudo ? ');
  String pseudo = stdin.readLineSync()!;

  Joueur joueur = Joueur(pseudo, 1, 100);

  int tour = 1;

  while (bot.sante > 0 && joueur.sante > 0) {
    print('========== Tour $tour ==========');

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

    print('-------------------------------');

    int degatsBot = lancerDes('bot');

    print('Le bot assène un coup à ${joueur.pseudo} avec une force de $degatsBot');

    joueur.sante -= degatsBot;

    if (joueur.sante < 0) {
      joueur.sante = 0;
    }

    print('${joueur.pseudo} - Santé ${joueur.sante}%');

    print('Fin du tour $tour');

    print('-------------------------------');

    joueur.afficherJoueur();
    print('-------------------------------');
    bot.afficherBot();

    tour++;
  }

  if (bot.sante <= 0) {
    print('Vous avez gagné la partie !');
  }
  else {
    print('Le bot a gagné la partie !');
  }
  
}