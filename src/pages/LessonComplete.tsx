
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  Home,
  ArrowRight,
  Star
} from 'lucide-react';

const LessonComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock completion data
  const completionData = {
    lessonTitle: "Business Meeting",
    totalTracks: 5,
    correctAnswers: 4,
    accuracy: 80,
    timeSpent: "12m 35s",
    newWordsLearned: 8,
    pointsEarned: 85
  };

  const accuracy = (completionData.correctAnswers / completionData.totalTracks) * 100;

  const getAccuracyBadge = (acc: number) => {
    if (acc >= 90) return { color: 'bg-green-100 text-green-800', label: 'Excelente!' };
    if (acc >= 70) return { color: 'bg-yellow-100 text-yellow-800', label: 'Bom trabalho!' };
    return { color: 'bg-red-100 text-red-800', label: 'Continue praticando!' };
  };

  const badge = getAccuracyBadge(accuracy);

  return (
    <div className="space-y-6">
      {/* Celebration Header */}
      <Card className="glass-effect text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <Trophy className="h-10 w-10 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-800 mb-2">
            Lição Concluída! 🎉
          </CardTitle>
          <CardDescription className="text-lg">
            {completionData.lessonTitle}
          </CardDescription>
          <Badge className={`mt-3 ${badge.color}`}>
            {badge.label}
          </Badge>
        </CardHeader>
      </Card>

      {/* Results Summary */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary-600" />
            Resumo dos Resultados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Accuracy Circle */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-32 h-32">
                  <Progress 
                    value={accuracy} 
                    className="h-32 w-32 [&>div]:rounded-full"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(accuracy)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Precisão
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                {completionData.correctAnswers} de {completionData.totalTracks} trechos corretos
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{completionData.timeSpent}</div>
                <div className="text-sm text-gray-600">Tempo gasto</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{completionData.pointsEarned}</div>
                <div className="text-sm text-gray-600">Pontos ganhos</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Detalhes por Trecho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: completionData.totalTracks }, (_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Trecho {i + 1}</span>
                <div className="flex items-center">
                  {i < completionData.correctAnswers ? (
                    <Badge className="bg-green-100 text-green-800">Correto</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Incorreto</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={() => navigate(`/lesson/${id}`)}
          variant="outline"
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Repetir Lição
        </Button>

        <Button 
          onClick={() => navigate('/my-lessons')}
          variant="outline"
          className="w-full"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Ver Minhas Lições
        </Button>

        <Button 
          onClick={() => navigate('/')}
          className="w-full bg-primary-600 hover:bg-primary-700"
        >
          <Home className="h-4 w-4 mr-2" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

export default LessonComplete;
