#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from stock_briefing_neuralnine.crew import StockBriefingNeuralnine

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")


def run():
    inputs = {
        'ticker': 'AAPL',
        'current_year': str(datetime.now().year)
    }

    StockBriefingNeuralnine().crew().kickoff(inputs=inputs)


def train():
    inputs = {
        "ticker": "AAPL",
        'current_year': str(datetime.now().year)
    }

    StockBriefingNeuralnine().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

def replay():
    StockBriefingNeuralnine().crew().replay(task_id=sys.argv[1])

def test():
    inputs = {
        "ticker": "AAPL",
        "current_year": str(datetime.now().year)
    }

    StockBriefingNeuralnine().crew().test(n_iterations=int(sys.argv[1]), eval_llm=sys.argv[2], inputs=inputs)

